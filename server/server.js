const http = require('http');
const fs = require('fs');

// Ruta del archivo JSON para almacenar usuarios
const USERS_FILE = 'usuarios.json';

// Función para leer usuarios del archivo
function getUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, 'utf8');
  return JSON.parse(data);
}

// Función para guardar usuarios en el archivo
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Crear servidor HTTP
const server = http.createServer((req, res) => {
  // Configurar encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir solicitudes de cualquier origen
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Encabezados permitidos

  // Manejar solicitudes OPTIONS (preflight CORS)
  if (req.method === 'OPTIONS') {
    res.writeHead(204); // No Content
    res.end();
    return;
  }

  // Rutas
  if (req.method === 'POST' && req.url === '/registro') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const newUser = JSON.parse(body);
        const users = getUsers();

        // Verificar si el usuario ya existe
        const exists = users.some(user => user.usuario === newUser.usuario);
        if (exists) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'El usuario ya existe.' }));
        } else {
          users.push(newUser);
          saveUsers(users);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Usuario registrado con éxito.' }));
        }
      } catch (err) {
        console.error('Error procesando el registro:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error en el servidor.' }));
      }
    });
  } else if (req.method === 'POST' && req.url === '/login') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const credentials = JSON.parse(body);
        const users = getUsers();

        // Validar credenciales
        const user = users.find(
          user =>
            user.usuario === credentials.usuario &&
            user.contrasena === credentials.contrasena
        );

        if (user) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            message: 'Inicio de sesión exitoso.',
            token: 'fake-jwt-token'
          }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Credenciales incorrectas.' }));
        }
      } catch (err) {
        console.error('Error procesando el inicio de sesión:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error en el servidor.' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Ruta no encontrada.' }));
  }
});

// Iniciar servidor
server.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});
