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

app.post('/api/projects', async (req, res) => {
    const { title, quantity } = req.body;
    const result = await pool.query("INSERT INTO projects (title, quantity) VALUES ($1, $2) RETURNING *", [title, quantity]);
    res.json(result.rows[0]);
});

app.get('/api/projects', async (req, res) => {
    const result = await pool.query("SELECT * FROM projects ORDER BY id DESC");
    res.json(result.rows);
});

app.listen(process.env.PORT || 3000, () => console.log('PrintAir Core Online'));