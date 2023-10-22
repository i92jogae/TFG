const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 3060;
app.use(bodyParser.json());

// Clave secreta para JWT (segura)
const secretKey = process.env.SECRET_KEY;

// Parámetros conexión a bd
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conexión a bd
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

// Middleware para comprobar autenticación de usuario
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Ruta de registro
app.post('/register', async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;

    // Comprobación de que el usuario no exista previamente (por email)
    db.query('SELECT * FROM USUARIO WHERE correo = ?', [correo], async (error, results) => {
      if (error) {
        console.error('Error checking user existence:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Se hashea contraseña de usuario nuevo
      const hashedPassword = await bcrypt.hash(contrasena, 10);

      // Inserción de nuevo usuario a bd
      db.query(
        'INSERT INTO USUARIO (nombre, correo, contrasena) VALUES (?, ?, ?)',
        [nombre, correo, hashedPassword],
        (error) => {
          if (error) {
            console.error('Error inserting user:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Ruta de Login
app.post('/login', async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // Comprobación de login
    db.query('SELECT * FROM USUARIO WHERE correo = ?', [correo], async (error, results) => {
      if (error) {
        console.error('Error retrieving user from database:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Error si usuario no existe
      if (results.length === 0) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      // Usuario existe en bd -> Comprobación de contraseña
      const passwordMatch = await bcrypt.compare(contrasena, results[0].CONTRASENA);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      else{console.log("Inicio de sesion correcto");}
      // Generación del JWT token para la sesión
      const token = jwt.sign({ id: results[0].ID, nombre: results[0].NOMBRE, correo: results[0].CORREO }, secretKey, {
        expiresIn: '1h', // Token expires in 1 hour
      });

      res.json({ token: token });
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Ruta protegida
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
