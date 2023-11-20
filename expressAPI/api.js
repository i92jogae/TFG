const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const OpenAI = require('openai');

dotenv.config();
const app = express();
const port = process.env.PORT || 3060;
app.use(bodyParser.json());
app.use(cors());

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
    db.query('SELECT * FROM usuario WHERE correo = ?', [correo], async (error, results) => {
      if (error) {
        console.error('Error retrieving user from database:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Error si usuario no existe
      if (results.length === 0) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      // Usuario existe en bd -> Comprobación de contraseña
      const passwordMatch = await bcrypt.compare(contrasena, results[0].contrasena);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      else{console.log("Inicio de sesion correcto");}
      // Generación del JWT token para la sesión
      const token = jwt.sign({ id: results[0].id, nombre: results[0].nombre, correo: results[0].correo }, secretKey, {
        expiresIn: '1h', // Token expires in 1 hour
      });

      res.json({ token: token });
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

// Consultas OpenAI
app.post('/sendqueryIA', async (req, res) => {
  const { query } = req.body; // Obtén la consulta del cuerpo de la solicitud

  // Realiza una solicitud a la API de ChatGPT utilizando Axios o tu método preferido
  const chatGptResponse = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{role:'user' ,content: query}],
  })
  // Devuelve la respuesta de ChatGPT al frontend
  res.json(chatGptResponse.choices[0].message.content);
});

//Guardado de consultas
app.post('/saveConversation', async (req, res) => {
  try {
    const { usuario_id, consulta, respuesta } = req.body;

    // Inserta la conversación en la tabla de retroalimentación
    db.query(
      'INSERT INTO RETROALIMENTACION (usuario_id, consulta, respuesta) VALUES (?, ?, ?)',
      [usuario_id, consulta, respuesta],
      (error) => {
        if (error) {
          console.error('Error inserting conversation:', error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Conversation saved successfully' });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Devolución de consultas
app.get('/userConsults', (req, res) => {
  const usuario_id = req.query.usuario_id; 
  // Obtener consultas del usuario desde la base de datos
  db.query('SELECT consulta, respuesta, fecha FROM RETROALIMENTACION WHERE usuario_id = ? ORDER BY fecha DESC', [usuario_id], (error, results) => {
    if (error) {
      console.error('Error retrieving user consultations:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(results);
  });
});
//Devolución de datos usuario
app.get('/userData', (req,res) => {
  const usuario_id = req.query.usuario_id;
  db.query('SELECT nombre, correo FROM USUARIO WHERE id = ?', [usuario_id], (error, results) => {
    if (error) {
      console.error('Error retrieving user consultations:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(results);
  });
});

// Ruta para editar nombre de usuario
app.put('/editUsername', async (req, res) => {
  try {
    const { usuario_id, nuevo_nombre } = req.body;

    // Obtiene el nombre actual del usuario
    db.query('SELECT nombre FROM USUARIO WHERE id = ?', [usuario_id], async (error, results) => {
      if (error) {
        console.error('Error retrieving current username:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Comprueba si el nuevo nombre es igual al actual
      if (nuevo_nombre === results[0].nombre) {
        return res.status(400).json({ error: 'El nuevo nombre es igual al actual' });
      }

      // Actualiza el nombre de usuario en la base de datos
      db.query('UPDATE USUARIO SET nombre = ? WHERE id = ?', [nuevo_nombre, usuario_id], (error) => {
        if (error) {
          console.error('Error updating username:', error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(200).json({ message: 'Username updated successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Ruta para editar contraseña
app.put('/editPassword', async (req, res) => {
  try {
    const { usuario_id, nueva_contrasena } = req.body;

    // Obtiene la contraseña actual del usuario
    db.query('SELECT contrasena FROM USUARIO WHERE id = ?', [usuario_id], async (error, results) => {
      if (error) {
        console.error('Error retrieving current password:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Comprueba si la nueva contraseña es igual a la actual
      const passwordMatch = await bcrypt.compare(nueva_contrasena, results[0].contrasena);
      if (passwordMatch) {
        return res.status(400).json({ error: 'La nueva contraseña es igual a la actual' });
      }

      // Hashea la nueva contraseña
      const hashedPassword = await bcrypt.hash(nueva_contrasena, 10);

      // Actualiza la contraseña en la base de datos
      db.query('UPDATE USUARIO SET contrasena = ? WHERE id = ?', [hashedPassword, usuario_id], (error) => {
        if (error) {
          console.error('Error updating password:', error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(200).json({ message: 'Password updated successfully' });
      });
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
