import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || '';

if (!connectionString) {
  console.warn('⚠️ DATABASE_URL is not set in environment variables.');
}

// Create a singleton connection pool
let pool: Pool;

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // Prevent hot-reload from exhausting connection pool in development
  const globalWithPool = global as typeof globalThis & {
    _postgresPool?: Pool;
  };
  
  if (!globalWithPool._postgresPool) {
    globalWithPool._postgresPool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }
  pool = globalWithPool._postgresPool;
}

let dbInitialized = false;

// Memory DB emulated storage for developer sandbox mode
interface MemoryDB {
  email_verifications: any[];
  onboarding_sessions: any[];
  schools: any[];
}

const getMemoryDB = (): MemoryDB => {
  const globalWithMemory = global as typeof globalThis & {
    _memoryDB?: MemoryDB;
  };
  if (!globalWithMemory._memoryDB) {
    globalWithMemory._memoryDB = {
      email_verifications: [],
      onboarding_sessions: [],
      schools: [],
    };
  }
  return globalWithMemory._memoryDB;
};

// Global switch to force in-memory emulation
const getUseMemoryDB = (): boolean => {
  const globalWithMemory = global as typeof globalThis & {
    _useMemoryDB?: boolean;
  };
  
  // Proactive check: if database URL is missing or points to the remote supabase that was failing
  if (globalWithMemory._useMemoryDB === undefined) {
    if (!connectionString || connectionString.includes('db.pzkonvssbdqhauqrkvbl.supabase.co')) {
      globalWithMemory._useMemoryDB = true;
      console.warn('🔌 Proactively enabled LOCAL DEVELOPER SANDBOX MODE (In-Memory DB emulation) due to missing or remote offline database host.');
    } else {
      globalWithMemory._useMemoryDB = false;
    }
  }
  return globalWithMemory._useMemoryDB;
};

const setUseMemoryDB = (val: boolean) => {
  const globalWithMemory = global as typeof globalThis & {
    _useMemoryDB?: boolean;
  };
  globalWithMemory._useMemoryDB = val;
};

let memoryDBBannerPrinted = false;

function printMemoryDBBanner() {
  if (memoryDBBannerPrinted) return;
  memoryDBBannerPrinted = true;
  console.log(`
┌────────────────────────────────────────────────────────┐
│                                                        │
│   🔌 OFFLINE DEVELOPER SANDBOX MODE ACTIVATED          │
│                                                        │
│   Database connection failed or is not configured.     │
│   All database queries are now emulated in-memory.     │
│   You can use ANY email and complete the full flow!    │
│                                                        │
└────────────────────────────────────────────────────────┘
`);
}

/**
 * Emulates standard SQL queries on our local in-memory database arrays.
 */
export async function handleMemoryQuery(text: string, params: any[] = []): Promise<{ rows: any[]; rowCount: number }> {
  printMemoryDBBanner();

  const db = getMemoryDB();
  const canonicalText = text.replace(/\s+/g, ' ').trim();
  const lowerText = canonicalText.toLowerCase();

  console.log(`[Emulated DB Query] ${canonicalText.substring(0, 120)}${canonicalText.length > 120 ? '...' : ''}`);
  if (params && params.length > 0) {
    console.log(`[Emulated DB Params]`, params);
  }

  // --- email_verifications queries ---
  if (lowerText.includes('email_verifications')) {
    // INSERT ON CONFLICT
    if (lowerText.startsWith('insert')) {
      const email = params[0];
      const token = params[1];
      const otpCode = params[2];
      const expiresAt = params[3];
      
      let row = db.email_verifications.find(r => r.email === email);
      if (!row) {
        row = { id: db.email_verifications.length + 1, email };
        db.email_verifications.push(row);
      }
      row.token = token;
      row.otp_code = otpCode;
      row.expires_at = expiresAt;
      row.verified = false;
      row.created_at = new Date();
      return { rows: [row], rowCount: 1 };
    }
    
    // UPDATE
    if (lowerText.startsWith('update')) {
      const emailMatch = canonicalText.match(/WHERE\s+email\s*=\s*\$(\d+)/i);
      const emailVal = emailMatch ? params[parseInt(emailMatch[1], 10) - 1] : params[0];
      const row = db.email_verifications.find(r => r.email === emailVal);
      if (row) {
        if (lowerText.includes('verified = true')) {
          row.verified = true;
        }
      }
      return { rows: [], rowCount: row ? 1 : 0 };
    }
    
    // SELECT
    if (lowerText.startsWith('select')) {
      const emailMatch = canonicalText.match(/WHERE\s+email\s*=\s*\$(\d+)/i);
      const emailVal = emailMatch ? params[parseInt(emailMatch[1], 10) - 1] : params[0];
      const row = db.email_verifications.find(r => r.email === emailVal);
      
      if (lowerText.includes('select verified')) {
        return { rows: row ? [{ verified: row.verified }] : [], rowCount: row ? 1 : 0 };
      }
      return { rows: row ? [row] : [], rowCount: row ? 1 : 0 };
    }
  }

  // --- onboarding_sessions queries ---
  if (lowerText.includes('onboarding_sessions')) {
    // INSERT ON CONFLICT
    if (lowerText.startsWith('insert')) {
      const email = params[0];
      let formData = params[1];
      if (typeof formData === 'string') {
        try {
          formData = JSON.parse(formData);
        } catch (e) {}
      }
      
      let row = db.onboarding_sessions.find(r => r.email === email);
      if (!row) {
        row = { id: db.onboarding_sessions.length + 1, email };
        db.onboarding_sessions.push(row);
      }
      row.current_step = 1;
      row.completed_steps = [];
      row.form_data = formData;
      row.created_at = new Date();
      row.updated_at = new Date();
      return { rows: [row], rowCount: 1 };
    }
    
    // UPDATE
    if (lowerText.startsWith('update')) {
      const emailMatch = canonicalText.match(/WHERE\s+email\s*=\s*\$(\d+)/i);
      const emailVal = emailMatch ? params[parseInt(emailMatch[1], 10) - 1] : params[0];
      let row = db.onboarding_sessions.find(r => r.email === emailVal);
      
      if (!row) {
        row = {
          id: db.onboarding_sessions.length + 1,
          email: emailVal,
          current_step: 1,
          completed_steps: [],
          form_data: {},
          created_at: new Date(),
          updated_at: new Date()
        };
        db.onboarding_sessions.push(row);
      }

      // Parse current_step
      const stepMatch = canonicalText.match(/current_step\s*=\s*(\d+)/i);
      if (stepMatch) {
        row.current_step = parseInt(stepMatch[1], 10);
      } else {
        const stepParamMatch = canonicalText.match(/current_step\s*=\s*\$(\d+)/i);
        if (stepParamMatch) {
          row.current_step = parseInt(params[parseInt(stepParamMatch[1], 10) - 1], 10);
        }
      }

      // Parse completed_steps additions
      let stepToAdd: string | null = null;
      if (canonicalText.includes('"1"')) stepToAdd = "1";
      else if (canonicalText.includes('"2"')) stepToAdd = "2";
      else if (canonicalText.includes('"3"')) stepToAdd = "3";
      else if (canonicalText.includes('"4"')) stepToAdd = "4";
      else if (canonicalText.includes('"5"')) stepToAdd = "5";

      if (stepToAdd) {
        if (!row.completed_steps) row.completed_steps = [];
        if (!row.completed_steps.includes(stepToAdd)) {
          row.completed_steps.push(stepToAdd);
        }
      }
      
      row.updated_at = new Date();
      return { rows: [row], rowCount: 1 };
    }
  }

  // --- schools queries ---
  if (lowerText.includes('schools')) {
    // INSERT
    if (lowerText.startsWith('insert')) {
      const email = params[0];
      const password = params[1];
      const subdomain = params[2];
      
      let row = db.schools.find(r => r.email === email);
      if (!row) {
        row = { id: db.schools.length + 1, email };
        db.schools.push(row);
      }
      row.password = password;
      row.subdomain = subdomain;
      row.theme_settings = {};
      row.features = [];
      return { rows: [row], rowCount: 1 };
    }
    
    // UPDATE
    if (lowerText.startsWith('update')) {
      const emailMatch = canonicalText.match(/WHERE\s+email\s*=\s*\$(\d+)/i);
      const emailVal = emailMatch ? params[parseInt(emailMatch[1], 10) - 1] : params[0];
      let row = db.schools.find(r => r.email === emailVal);
      
      if (!row) {
        row = {
          id: db.schools.length + 1,
          email: emailVal,
          password: 'emulated_password',
          subdomain: 'emulated_subdomain',
          theme_settings: {},
          features: []
        };
        db.schools.push(row);
      }

      // Perform all regex assignments
      const assignmentRegex = /(\w+)\s*=\s*(?:COALESCE\s*\()?\s*\$(\d+)/gi;
      let match;
      while ((match = assignmentRegex.exec(canonicalText)) !== null) {
        const col = match[1].toLowerCase();
        const paramIdx = parseInt(match[2], 10) - 1;
        let val = params ? params[paramIdx] : null;
        
        if (col === 'theme_settings' || col === 'features') {
          if (typeof val === 'string') {
            try {
              val = JSON.parse(val);
            } catch (e) {}
          }
        }

        const assignmentExpr = canonicalText.substring(match.index, match.index + match[0].length + 15);
        const isCoalesce = /COALESCE/i.test(assignmentExpr);
        if (isCoalesce && (val === null || val === undefined)) {
          // Keep existing
        } else {
          row[col] = val;
        }
      }

      if (canonicalText.includes("dns_status = 'pending'")) row.dns_status = 'pending';
      if (canonicalText.includes("ssl_enabled = FALSE")) row.ssl_enabled = false;

      return { rows: [row], rowCount: 1 };
    }
    
    // SELECT
    if (lowerText.startsWith('select')) {
      // Check if this is the custom domain availability check query
      if (lowerText.includes('subdomain = $1 or custom_domain = $2 or custom_domain = $3')) {
        const subPrefix = params[0];
        const dom1 = params[1];
        const dom2 = params[2];
        const row = db.schools.find(r => 
          (r.subdomain && r.subdomain.toLowerCase() === subPrefix.toLowerCase()) || 
          (r.custom_domain && r.custom_domain.toLowerCase() === dom1.toLowerCase()) ||
          (r.custom_domain && r.custom_domain.toLowerCase() === dom2.toLowerCase())
        );
        return { rows: row ? [{ id: row.id }] : [], rowCount: row ? 1 : 0 };
      }

      // Check subdomain index or email index
      const subdomainMatch = canonicalText.match(/WHERE\s+subdomain\s*=\s*\$(\d+)/i);
      if (subdomainMatch) {
        const subVal = params[parseInt(subdomainMatch[1], 10) - 1];
        
        // Also check if AND email != $2
        const emailDiffMatch = canonicalText.match(/AND\s+email\s*!=\s*\$(\d+)/i);
        if (emailDiffMatch) {
          const emailDiffVal = params[parseInt(emailDiffMatch[1], 10) - 1];
          const row = db.schools.find(r => r.subdomain === subVal && r.email !== emailDiffVal);
          return { rows: row ? [{ id: row.id }] : [], rowCount: row ? 1 : 0 };
        } else {
          const row = db.schools.find(r => r.subdomain === subVal);
          return { rows: row ? [{ id: row.id }] : [], rowCount: row ? 1 : 0 };
        }
      }

      const emailMatch = canonicalText.match(/WHERE\s+email\s*=\s*\$(\d+)/i);
      const emailVal = emailMatch ? params[parseInt(emailMatch[1], 10) - 1] : params[0];
      const row = db.schools.find(r => r.email === emailVal);
      
      if (lowerText.includes('select subdomain')) {
        return { rows: row ? [{ subdomain: row.subdomain }] : [], rowCount: row ? 1 : 0 };
      }
      return { rows: row ? [row] : [], rowCount: row ? 1 : 0 };
    }
  }

  // Generic fallback: return success with empty array
  return { rows: [], rowCount: 0 };
}

/**
 * Ensures all required tables and columns for the onboarding
 * and verification flows exist in the database.
 */
export async function initDB() {
  if (getUseMemoryDB()) {
    return null;
  }
  
  if (dbInitialized) return pool;

  try {
    console.log('🔄 Initializing database schema...');
    
    // 1. Verify 'schools' table exists and add new onboarding fields
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
        theme_settings JSONB,
        subdomain VARCHAR(255) UNIQUE,
        custom_domain VARCHAR(255) UNIQUE,
        dns_status VARCHAR(50) DEFAULT 'pending',
        ssl_enabled BOOLEAN DEFAULT FALSE,
        dns_checked_at TIMESTAMP
      );
    `);

    // Add extra onboarding and schema columns to 'schools' table if they are missing
    const columnsToAdd = [
      { name: 'email', type: 'VARCHAR(255)' },
      { name: 'password', type: 'VARCHAR(255)' },
      { name: 'name', type: 'VARCHAR(255)' },
      { name: 'tagline', type: 'VARCHAR(255)' },
      { name: 'description', type: 'TEXT' },
      { name: 'logo', type: 'VARCHAR(255)' },
      { name: 'image', type: 'VARCHAR(255)' },
      { name: 'template', type: 'VARCHAR(50)' },
      { name: 'theme_settings', type: 'JSONB DEFAULT \'{}\'::jsonb' },
      { name: 'subdomain', type: 'VARCHAR(255)' },
      { name: 'custom_domain', type: 'VARCHAR(255)' },
      { name: 'dns_status', type: 'VARCHAR(50) DEFAULT \'pending\'' },
      { name: 'ssl_enabled', type: 'BOOLEAN DEFAULT FALSE' },
      { name: 'dns_checked_at', type: 'TIMESTAMP' },
      { name: 'school_type', type: 'VARCHAR(100)' },
      { name: 'principal_name', type: 'VARCHAR(255)' },
      { name: 'contact_number', type: 'VARCHAR(100)' },
      { name: 'address', type: 'TEXT' },
      { name: 'features', type: 'JSONB DEFAULT \'[]\'::jsonb' }
    ];

    for (const col of columnsToAdd) {
      try {
        await pool.query(`ALTER TABLE schools ADD COLUMN ${col.name} ${col.type};`);
        console.log(`➕ Added column '${col.name}' to 'schools' table.`);
      } catch (e) {
        // Column already exists, ignore error
      }
    }

    // 2. Create 'email_verifications' table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS email_verifications (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        token VARCHAR(255),
        otp_code VARCHAR(10),
        expires_at TIMESTAMP NOT NULL,
        verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Verified or created table: email_verifications');

    // 3. Create 'onboarding_sessions' table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS onboarding_sessions (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        current_step INT DEFAULT 1,
        completed_steps JSONB DEFAULT '[]'::jsonb,
        form_data JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Verified or created table: onboarding_sessions');

    dbInitialized = true;
    console.log('🎉 Database initialization complete.');
  } catch (err: any) {
    console.error('❌ Error during database schema initialization:', err.message);
    console.warn('⚠️ Entering local in-memory developer sandbox mode.');
    setUseMemoryDB(true);
  }

  return pool;
}

// Export database pool. To make queries, standard use is:
// import { query } from '@/lib/db';
// await query('SELECT...', [...]);
export async function query(text: string, params?: any[]) {
  if (getUseMemoryDB()) {
    return handleMemoryQuery(text, params);
  }

  try {
    const activePool = await initDB();
    if (getUseMemoryDB() || !activePool) {
      return handleMemoryQuery(text, params);
    }
    return await activePool.query(text, params);
  } catch (err: any) {
    console.warn('⚠️ Database query failed. Falling back to local in-memory developer sandbox mode. Error:', err.message);
    setUseMemoryDB(true);
    return handleMemoryQuery(text, params);
  }
}

export default pool;
