
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/COTIDIANO_CRUD/index.html' : req.url;

    if (!filePath.startsWith('/COTIDIANO_CRUD/')) {
        filePath = '/COTIDIANO_CRUD' + filePath;
    }
    
    const fullPath = path.join(__dirname, filePath);
    const ext = path.extname(filePath);
    
    let contentType = 'text/html';
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.js') contentType = 'application/javascript';
    
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - Archivo no encontrado</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor ejecutándose en http://0.0.0.0:${PORT}`);
    console.log('Tu aplicación de gestión de inventario está lista!');
});
