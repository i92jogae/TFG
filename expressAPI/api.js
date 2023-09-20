const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

// Secret key for JWT (should be kept secret)
const secretKey = 'your-secret-key';

// Sample user data (should be stored in a database)
const users = [];dj

// Middleware to check if the user is authenticated
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Register route
app.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if the user already exists
    if (users.some((user) => user.username === username)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = {
      id: users.length + 1,
      username: username,
      password: hashedPassword,
      role: role || 'user',
    };

    // Add the user to the array (in a production app, you'd save this to a database)
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username (in a production app, this would be done via a database query)
    const user = users.find((user) => user.username === username);

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.json({ token: token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
