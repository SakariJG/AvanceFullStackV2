const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
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

// Obtener todas las contraseñas en texto plano
db.query('SELECT id, contraseña FROM Clientes', async (err, results) => {
    if (err) {
        console.error('Error al obtener las contraseñas:', err);
        return;
    }

    // Hashear cada contraseña y actualizar la base de datos
    for (const row of results) {
        const { id, contraseña } = row;

        // Hashear la contraseña
        bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error al hashear la contraseña:', err);
                return;
            }

            // Actualizar la contraseña en la base de datos
            db.query('UPDATE Clientes SET contraseña = ? WHERE id = ?', [hashedPassword, id], (err, result) => {
                if (err) {
                    console.error('Error al actualizar la contraseña:', err);
                    return;
                }
                console.log(`Contraseña hasheada para el usuario con ID ${id}.`);
            });
        });
    }
});