require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// GET PROJECTS
app.get('/api/projects', async (req, res) => {
    const result = await pool.query("SELECT * FROM projects ORDER BY created_at DESC");
    res.json(result.rows);
});

// POST PROJECT
app.post('/api/projects', async (req, res) => {
    const { title, quantity, category } = req.body;
    const result = await pool.query(
        "INSERT INTO projects (title, quantity, category) VALUES ($1, $2, $3) RETURNING *",
        [title, quantity, category]
    );
    res.json(result.rows[0]);
});

app.listen(process.env.PORT || 3000, () => console.log('PrintAir Core Running'));