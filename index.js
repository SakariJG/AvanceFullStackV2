const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Cargar las variables de entorno del archivo .env
dotenv.config();

// Crear conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Verificar la conexión
db.connect((err) => {
  if (err) {
    console.error('Error de conexión: ', err.stack);
    return;
  }
  console.log('Conexión a la base de datos MySQL exitosa.');
});

const app = express();
app.use(express.json());
app.use(express.static('public'));

// **Registro de usuario**
app.post('/api/register', (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Las contraseñas no coinciden' });
  }

  // Verificar si el usuario ya existe
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error al consultar la base de datos' });
    }
    if (result.length > 0) {
      return res.status(400).json({ success: false, message: 'Este usuario ya está registrado' });
    }

    // Hashear la contraseña antes de guardarla
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error al hashear la contraseña' });
      }

      // Insertar el usuario en la base de datos
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error al guardar el usuario' });
        }
        res.status(200).json({ success: true, message: 'Usuario registrado exitosamente' });
      });
    });
  });
});

// **Inicio de sesión**
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Buscar al usuario en la base de datos
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error al consultar la base de datos' });
    }
    if (result.length === 0) {
      return res.status(400).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Comparar las contraseñas
    bcrypt.compare(password, result[0].password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error al comparar contraseñas' });
      }
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Contraseña incorrecta' });
      }

      // Inicio de sesión exitoso
      res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
    });
  });
});

// **Agregar cita**
app.post('/api/appointments', (req, res) => {
  const { userId, service, date, time } = req.body;

  // Insertar la cita en la base de datos
  db.query('INSERT INTO appointments (user_id, service, date, time) VALUES (?, ?, ?, ?)', 
    [userId, service, date, time], (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error al agendar la cita' });
      }
      res.status(200).json({ success: true, message: 'Cita agendada exitosamente' });
  });
});

// **Ver citas del usuario**
app.get('/api/appointments/:userId', (req, res) => {
  const userId = req.params.userId;

  db.query('SELECT * FROM appointments WHERE user_id = ?', [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error al obtener las citas' });
    }
    res.status(200).json(result);
  });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
