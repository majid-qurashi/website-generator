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
                template VARCHAR(50)
            );
        `);
        try {
            await pool.query(`ALTER TABLE schools ADD COLUMN tagline VARCHAR(255);`);
            await pool.query(`ALTER TABLE schools ADD COLUMN description TEXT;`);
            await pool.query(`ALTER TABLE schools ADD COLUMN logo VARCHAR(255);`);
            await pool.query(`ALTER TABLE schools ADD COLUMN image VARCHAR(255);`);
        } catch (e) {
            // Columns might already exist
        }
        console.log("Database table 'schools' is verified and ready.");
    } catch (err) {
        console.error("Database connection failed. Please ensure your pgAdmin service is running and credentials are correct. Error:", err.message);
    }
};
initDB();

/* STEP 1: Register School */
app.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        const newSchool = await pool.query(
            "INSERT INTO schools (email, password) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password RETURNING *",
            [email, password]
        );

        res.json(newSchool.rows[0]);
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

        await pool.query(
            "UPDATE schools SET name = $1, tagline = $2, description = $3, logo = COALESCE($4, logo), image = COALESCE($5, image) WHERE email = $6",
            [name, tagline, description, logo, image, email]
        );

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});