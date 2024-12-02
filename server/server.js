const http = require('http');
const fs = require('fs');

// Archivo donde se almacenan los usuarios
const USERS_FILE = 'usuarios.json';

// Leer usuarios del archivo
function getUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, 'utf8');
  return JSON.parse(data);
}

// Guardar usuarios en el archivo
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

// Crear servidor
const server = http.createServer((req, res) => {
  // Configuración de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejo de solicitudes OPTIONS (necesario para CORS)
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Ruta para iniciar sesión
  if (req.method === 'POST' && req.url === '/login') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
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
          tipo: user.tipo, // Tipo de usuario (alumno/tutor)
          token: 'fake-jwt-token',
          nombre: user.nombre, // Nombre del usuario
          apellidos: user.apellidos // Apellidos del usuario
        }));
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Credenciales incorrectas.' }));
      }
    });
  } 

  // Ruta para registrar usuario
  else if (req.method === 'POST' && req.url === '/registro') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
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
    });
  } 

  // Si la ruta no existe
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Ruta no encontrada.' }));
  }
});

// Iniciar servidor
server.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});
