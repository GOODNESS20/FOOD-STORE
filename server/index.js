import express from 'express';
import { Connection, Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express ();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.post('/api/register', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confirmPassword)
    return res.status(400).json({error: 'Passwords do not match' });

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'username already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );
    
    const newUser = result.rows[0];
    console.log('New user saved:', result.rows[0]);

    

    const token = jwt.sign({ id: newUser.id}, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(201).json({ token, redirectTo: '/order' ,message: 'Registeration successful'});
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'server error'});
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if(!username || !password ) {
    return res.status(400).json({ error: 'All fields are required'});
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
     if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username}, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json ({
      token,
      redirectTo: '/order',
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'server error'});
  }
});

//app.get("/login", (req, res) => {
  //res.render("order.jsx");
//});

//app.post("/register", async (req, res) => {
  //const email = req.body.username;
  //const password = req.body.password;

  //try {
    //const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      //email,
    //]);

    //if (checkResult.rows.length > 0) {
      //res.send("Email already exists. Try logging in.");
    //} else {
      //const result = await db.query(
        //"INSERT INTO users (email, password) VALUES ($1, $2)",
        //[email, password]
      //);
      //console.log(result);
      //res.render("secrets.ejs");
    //}
  //} catch (err) {
    //console.log(err);
  //}
//});

//app.post("/login", async (req, res) => {
  //const email = req.body.username;
  //const password = req.body.password;

  //try {
    //const result = await db.query("SELECT * FROM users WHERE email = $1", [
     // email,
    //]);
    //if (result.rows.length > 0) {
      //const user = result.rows[0];
      //const storedPassword = user.password;

      //if (password === storedPassword) {
        //res.render("order.jsx");
      //} else {
       // res.send("Incorrect Password");
     // }
    //} else {
      //res.send("User not found");
    //}
  //} catch (err) {
   // console.log(err);
 // }
//});

app.post("/api/orders", async (req, res) => {
  try {
    const { reference, items, total, userId } = req.body;

    if (!items || !Array.isArray(items)) {
      console.error("❌ Invalid items received:", items);
      return res.status(400).json({ error: "Invalid or missing items array" });
    }

    const jsonItems = JSON.stringify(items);

    const result = await pool.query(
      "INSERT INTO orders (reference, items, total, user_id) VALUES ($1, $2::jsonb, $3, $4) RETURNING *",
      [reference, jsonItems, total, userId]
    );

    res.status(201).json({ order: result.rows[0] });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Failed to save order." });
  }
});


app.listen (PORT, () => {
    console.log(`server running on port ${PORT}.`);
    
})