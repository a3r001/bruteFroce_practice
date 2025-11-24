const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Credenciales correctas
const CORRECT_USERNAME = 'admin';
const CORRECT_PASSWORD = 'admin';

// Ruta para servir el HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta POST para validar login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Validar que se envíen los datos
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Usuario y contraseña son requeridos'
        });
    }

    // Validar credenciales
    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
        return res.json({
            success: true,
            message: 'Autenticación exitosa',
            password: password
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Usuario o contraseña incorrectos'
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log('Usuario: admin');
    console.log('Contraseña: admin');
    
});