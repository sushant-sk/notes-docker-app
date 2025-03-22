const express = require('express')
const { Pool } = require('pg')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
})

// Auto-create table
pool.query(`
  CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    content TEXT
  );
`)

// Routes
app.post('/notes', async (req, res) => {
  const { content } = req.body
  await pool.query('INSERT INTO notes (content) VALUES ($1)', [content])
  res.sendStatus(201)
})

app.delete('/notes/:id', async (req, res) => {
  await pool.query('DELETE FROM notes WHERE id = $1', [req.params.id])
  res.sendStatus(200)
})

app.get('/notes', async (req, res) => {
  const result = await pool.query('SELECT * FROM notes')
  res.json(result.rows)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Backend running on ${PORT}`))