require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD.toString(), // Force string conversion
  port: process.env.DB_PORT,
});

// Test DB connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('DB connection error:', err);
  else console.log('DB connected at:', res.rows[0].now);
});

//MIDDLEWARE HERE =====
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
app.use(express.static(__dirname));

// Routes here =======
app.get('/user/profile', authenticate, async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [req.user.userId] // Accessible via middleware
    );
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Registration endpoint
app.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      `INSERT INTO users (name, email, phone, password) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, name, email`,
      [name, email, phone, hashedPassword]
    );
    
    // Generate token for new user (Add this part)
    const token = jwt.sign(
      { userId: result.rows[0].id },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
    
    res.status(201).json({
      user: result.rows[0],
      token // Include token in response
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const isValid = await bcrypt.compare(password, user.rows[0].password);
    
    if (!isValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    
    // JWT Token Generation (Add this part)
    const token = jwt.sign(
      { userId: user.rows[0].id }, 
      process.env.SECRET_KEY, 
      { expiresIn: '1h' }
    );
    
    // Return token with user data (Remove password)
    const { password: _, ...userData } = user.rows[0];
    res.json({ 
      message: "Login successful", 
      user: userData,
      token 
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});