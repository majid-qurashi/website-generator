require("dotenv").config();
console.log(process.env.DATABASE_URL);
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'backend/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

const app = express();

app.use(cors({
    origin: "*",
}));
app.use(express.json());

// Initialize Database Table if it doesn't exist yet
const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS schools (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255),
                tagline VARCHAR(255),
                description TEXT,
                logo VARCHAR(255),
                image VARCHAR(255),
                template VARCHAR(50),
                theme_settings JSONB
            );
        `);
        try {
            await pool.query(`ALTER TABLE schools ADD COLUMN tagline VARCHAR(255);`);
            await pool.query(`ALTER TABLE schools ADD COLUMN description TEXT;`);
            await pool.query(`ALTER TABLE schools ADD COLUMN logo VARCHAR(255);`);
            await pool.query(`ALTER TABLE schools ADD COLUMN image VARCHAR(255);`);
        } catch (e) {}
        try {
            await pool.query(`ALTER TABLE schools ADD COLUMN theme_settings JSONB;`);
        } catch (e) {}
        try {
            await pool.query(`ALTER TABLE schools ADD COLUMN subdomain VARCHAR(255) UNIQUE;`);
        } catch (e) {}
        try {
            await pool.query(`ALTER TABLE schools ADD COLUMN custom_domain VARCHAR(255) UNIQUE;`);
        } catch (e) {}
        try {
            await pool.query(`ALTER TABLE schools ADD COLUMN dns_status VARCHAR(50) DEFAULT 'pending';`);
        } catch (e) {}
        try {
            await pool.query(`ALTER TABLE schools ADD COLUMN ssl_enabled BOOLEAN DEFAULT FALSE;`);
        } catch (e) {}
        try {
            await pool.query(`ALTER TABLE schools ADD COLUMN dns_checked_at TIMESTAMP;`);
        } catch (e) {}

        // Backfill default subdomains for any schools that don't have one
        try {
            await pool.query(`
                UPDATE schools 
                SET subdomain = LOWER(SPLIT_PART(email, '@', 1))
                WHERE subdomain IS NULL;
            `);
        } catch (e) {}

        console.log("Database table 'schools' is verified and ready with custom domain support.");
    } catch (err) {
        console.error("Database connection failed. Please ensure your pgAdmin service is running and credentials are correct. Error:", err.message);
    }
};
initDB();

/* STEP 1: Register School */
app.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if school already exists
        const existing = await pool.query("SELECT * FROM schools WHERE email = $1", [email]);
        let schoolRow;
        if (existing.rows.length > 0) {
            // Update password
            const result = await pool.query(
                "UPDATE schools SET password = $1 WHERE email = $2 RETURNING *",
                [password, email]
            );
            schoolRow = result.rows[0];
        } else {
            // Generate a unique subdomain based on email prefix
            let defaultSubdomain = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
            if (!defaultSubdomain) defaultSubdomain = 'school';
            
            let uniqueSub = defaultSubdomain;
            let suffix = 1;
            while (true) {
                const check = await pool.query("SELECT id FROM schools WHERE subdomain = $1", [uniqueSub]);
                if (check.rows.length === 0) {
                    break;
                }
                uniqueSub = `${defaultSubdomain}${suffix}`;
                suffix++;
            }
            
            const result = await pool.query(
                "INSERT INTO schools (email, password, subdomain) VALUES ($1, $2, $3) RETURNING *",
                [email, password, uniqueSub]
            );
            schoolRow = result.rows[0];
        }
        res.json(schoolRow);
    } catch (err) {
        console.error("Register Error:", err.message);
        // CRITICAL: We MUST send an error response to React, or the Next button hangs forever!
        res.status(500).json({ error: "Server Error", details: err.message });
    }
});

/* STEP 2: Add School Details */
app.post("/school-details", upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
    try {
        const { email, name, tagline, description } = req.body;
        const logo = req.files && req.files['logo'] ? req.files['logo'][0].filename : null;
        const image = req.files && req.files['image'] ? req.files['image'][0].filename : null;

        // Optionally update subdomain to match school name slug if it's the default email prefix
        let nameSlug = name.toLowerCase().trim().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        if (!nameSlug) nameSlug = 'school';
        
        // Find existing subdomain
        const currentRes = await pool.query("SELECT subdomain, email FROM schools WHERE email = $1", [email]);
        let subdomainToSet = null;
        if (currentRes.rows.length > 0) {
            const currentSub = currentRes.rows[0].subdomain;
            const emailPrefix = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
            // Only overwrite if current subdomain is default email prefix
            if (!currentSub || currentSub === emailPrefix) {
                // Ensure nameSlug is unique
                let uniqueSub = nameSlug;
                let suffix = 1;
                while (true) {
                    const check = await pool.query("SELECT id FROM schools WHERE subdomain = $1 AND email != $2", [uniqueSub, email]);
                    if (check.rows.length === 0) {
                        break;
                    }
                    uniqueSub = `${nameSlug}-${suffix}`;
                    suffix++;
                }
                subdomainToSet = uniqueSub;
            }
        }

        if (subdomainToSet) {
            await pool.query(
                "UPDATE schools SET name = $1, tagline = $2, description = $3, logo = COALESCE($4, logo), image = COALESCE($5, image), subdomain = $6 WHERE email = $7",
                [name, tagline, description, logo, image, subdomainToSet, email]
            );
        } else {
            await pool.query(
                "UPDATE schools SET name = $1, tagline = $2, description = $3, logo = COALESCE($4, logo), image = COALESCE($5, image) WHERE email = $6",
                [name, tagline, description, logo, image, email]
            );
        }

        res.json("Updated");
    } catch (err) {
        console.error("Details Error:", err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
});

/* STEP 3: Select Template */
app.post("/select-template", async (req, res) => {
    try {
        const { email, template } = req.body;

        await pool.query(
            "UPDATE schools SET template = $1 WHERE email = $2",
            [template, email]
        );

        res.json("Template Selected");
    } catch (err) {
        console.error("Template Error:", err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
});

/* STEP 4: Save Theme Settings */
app.post("/save-theme-settings", async (req, res) => {
    try {
        const { email, themeSettings } = req.body;

        await pool.query(
            "UPDATE schools SET theme_settings = $1 WHERE email = $2",
            [JSON.stringify(themeSettings), email]
        );

        res.json({ success: true, message: "Theme Settings Saved" });
    } catch (err) {
        console.error("Save Theme Settings Error:", err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
});

/* Get School Settings by Email */
app.post("/school-settings", async (req, res) => {
    try {
        const { email } = req.body;
        const result = await pool.query("SELECT * FROM schools WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "School not found" });
        }
        res.json({ success: true, school: result.rows[0] });
    } catch (err) {
        console.error("School Settings Query Error:", err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
});

/* STEP 5: Update Subdomain / Custom Domain Settings */
app.post("/update-domain-settings", async (req, res) => {
    try {
        const { email, subdomain, customDomain } = req.body;

        if (subdomain) {
            // Clean subdomain
            const cleanSub = subdomain.toLowerCase().trim().replace(/[^a-z0-9\-]/g, '').replace(/-+/g, '-');
            if (cleanSub.length < 3) {
                return res.status(400).json({ error: "Subdomain must be at least 3 characters long." });
            }
            
            // Check uniqueness
            const check = await pool.query("SELECT id FROM schools WHERE subdomain = $1 AND email != $2", [cleanSub, email]);
            if (check.rows.length > 0) {
                return res.status(400).json({ error: "Subdomain is already taken by another school." });
            }

            await pool.query("UPDATE schools SET subdomain = $1 WHERE email = $2", [cleanSub, email]);
        }

        if (customDomain !== undefined) {
            const cleanDom = customDomain ? customDomain.toLowerCase().trim().replace(/[^a-z0-9\.\-]/g, '') : null;
            if (cleanDom) {
                // Check uniqueness
                const check = await pool.query("SELECT id FROM schools WHERE custom_domain = $1 AND email != $2", [cleanDom, email]);
                if (check.rows.length > 0) {
                    return res.status(400).json({ error: "Custom domain is already connected to another school." });
                }
                
                // When a new domain is set, reset dns_status and ssl_enabled
                await pool.query(
                    "UPDATE schools SET custom_domain = $1, dns_status = 'pending', ssl_enabled = false WHERE email = $2",
                    [cleanDom, email]
                );
            } else {
                await pool.query(
                    "UPDATE schools SET custom_domain = null, dns_status = 'pending', ssl_enabled = false WHERE email = $2",
                    [email]
                );
            }
        }

        // Fetch updated school info
        const updated = await pool.query("SELECT * FROM schools WHERE email = $1", [email]);
        res.json({ success: true, school: updated.rows[0] });
    } catch (err) {
        console.error("Update Domain Settings Error:", err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
});

/* STEP 6: Verify DNS Settings (Mock integration for automatic SSL / let's encrypt setup) */
app.post("/verify-dns-settings", async (req, res) => {
    try {
        const { email } = req.body;
        const check = await pool.query("SELECT custom_domain FROM schools WHERE email = $1", [email]);
        
        if (check.rows.length === 0 || !check.rows[0].custom_domain) {
            return res.status(400).json({ error: "No custom domain connected to verify." });
        }

        // Simulating verification success for any domain connecting.
        // Sets state to connected, ssl_enabled to true, dns_checked_at to NOW()
        await pool.query(
            "UPDATE schools SET dns_status = 'connected', ssl_enabled = true, dns_checked_at = NOW() WHERE email = $1",
            [email]
        );

        const updated = await pool.query("SELECT * FROM schools WHERE email = $1", [email]);
        res.json({ success: true, school: updated.rows[0] });
    } catch (err) {
        console.error("Verify DNS Error:", err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});