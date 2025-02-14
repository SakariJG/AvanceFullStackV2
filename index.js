const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Crear conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err.stack);
        return;
    }
    console.log('Conexión a la base de datos MySQL exitosa.');
});

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Verifica los datos recibidos
  console.log('Datos recibidos:', { email, password });

  // Buscar al usuario en la base de datos
  db.query('SELECT * FROM Clientes WHERE Email = ?', [email], (err, result) => {
      if (err) {
          console.error('Error en la consulta SQL:', err);
          return res.status(500).json({ success: false, message: 'Error al consultar la base de datos.' });
      }

      // Verifica el resultado de la consulta
      console.log('Resultado de la consulta:', result);

      // Verificar si el usuario existe
      if (result.length === 0) {
          return res.status(400).json({ success: false, message: 'Correo electrónico no encontrado.' });
      }

      // Comparar la contraseña proporcionada con el hash almacenado
      const hashedPassword = result[0].Contraseña;
      bcrypt.compare(password, hashedPassword, (err, isMatch) => {
          if (err) {
              console.error('Error al comparar contraseñas:', err);
              return res.status(500).json({ success: false, message: 'Error al comparar contraseñas.' });
          }

          // Verificar si las contraseñas coinciden
          if (!isMatch) {
              return res.status(400).json({ success: false, message: 'Contraseña incorrecta.' });
          }

          // Inicio de sesión exitoso
          res.status(200).json({ success: true, message: 'Inicio de sesión exitoso.' });
      });
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});