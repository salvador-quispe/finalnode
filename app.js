const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();

const ip = 'localhost';
const port = 3000;

// Configuración de la conexión a la base de datos (para ambas bases)
const pool = mysql.createPool({
    host: 'database-1.cl4ameyi8vh6.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '15423803salvador',
    database: 'tem',  // Especificar la base de datos aquí
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


// Configuración de middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'HTML', 'Inicio.html'));
});

// Ruta para el formulario de contacto
app.post('/submit-form', (req, res) => {
    const { nombre, apellidos, celular, gmail, descripcion } = req.body;

    // Cambiar a la base de datos 'consultas'
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err.stack);
            res.status(500).send('Ocurrió un error al procesar tu consulta.');
            return;
        }

        connection.changeUser({ database: 'tem' }, (err) => {
            if (err) {
                console.error('Error al cambiar a la base de datos consultas:', err.stack);
                connection.release();
                res.status(500).send('Ocurrió un error al procesar tu consulta.');
                return;
            }

            const query = 'INSERT INTO Contactanos (nombre, apellidos, celular, gmail, descripcion) VALUES (?, ?, ?, ?, ?)';
            connection.query(query, [nombre, apellidos, celular, gmail, descripcion], (err, result) => {
                if (err) {
                    console.error('Error al insertar datos en Contactanos: ' + err.stack);
                    res.status(500).send('Ocurrió un error al procesar tu consulta.');
                } else {
                    // Redirige a la página de inicio después de enviar el formulario
                    res.redirect('/');
                }
                connection.release();
            });
        });
    });
});

// Ruta para obtener los eventos del día (hoy)
app.get('/api/eventos', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err.stack);
            res.status(500).send('Ocurrió un error al conectar con la base de datos.');
            return;
        }

        // Establecer la zona horaria de la sesión a la zona horaria de Perú (GMT-5)
        connection.query("SET time_zone = '-05:00'", (err) => {
            if (err) {
                console.error('Error al configurar la zona horaria:', err.stack);
                connection.release();
                res.status(500).send('Ocurrió un error al configurar la zona horaria.');
                return;
            }

            // Consulta para los eventos de hoy (considerando la zona horaria de Perú)
            const queryHoy = 'SELECT * FROM Calendario WHERE DATE(fecha) = CURDATE() ORDER BY fecha;';

            connection.query(queryHoy, (err, resultsHoy) => {
                if (err) {
                    console.error('Error al obtener los eventos de hoy:', err.stack);
                    res.status(500).send('Ocurrió un error al obtener los eventos.');
                    connection.release();
                    return;
                }

                // Devuelve los resultados al cliente
                res.json({
                    hoy: resultsHoy || [], // Devuelve los eventos de hoy o un array vacío
                });

                connection.release();
            });
        });
    });
});

// Ruta para obtener las noticias de la ODS7
app.get('/api/noticias', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err.stack);
            res.status(500).send('Ocurrió un error al conectar con la base de datos.');
            return;
        }

        // Consulta para obtener las noticias de la ODS7
        const queryNoticias = 'SELECT * FROM NoticiasODS7 ORDER BY FechaPublicacion DESC;';

        connection.query(queryNoticias, (err, resultsNoticias) => {
            if (err) {
                console.error('Error al obtener las noticias:', err.stack);
                res.status(500).send('Ocurrió un error al obtener las noticias.');
                connection.release();
                return;
            }

            // Devuelve los resultados al cliente
            res.json({
                noticias: resultsNoticias || [], // Devuelve las noticias o un array vacío
            });

            connection.release();
        });
    });
});



// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://${ip}:${port}`);
});
