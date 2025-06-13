
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(cors());

const DATA_FILE = path.join(__dirname, 'proyectos.json');

class Proyecto {
    constructor(id, nombre, responsable, estado, avance) {
        this.id = id;
        this.nombre = nombre;
        this.responsable = responsable;
        this.estado = estado; 
        this.avance = avance; 
    }

    iniciarProyecto() {
        this.estado = 'En curso';
    }

    actualizarAvance(valor) {
        this.avance = valor;
        if (valor >= 100) {
            this.estado = 'Finalizado';
        }
    }

    resumenProyecto() {
        return `Proyecto: ${this.nombre}, Responsable: ${this.responsable}, Estado: ${this.estado}, Avance: ${this.avance}%`;
    }
}
function leerProyectos() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, JSON.stringify([]));
        }
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    } catch (error) {
        console.error("Error leyendo datos: ", error);
        return [];
    }
}

function guardarProyectos(proyectos) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(proyectos, null, 2));
    } catch (error) {
        console.error("Error guardando datos: ", error);
    }
}
app.get('/proyectos', (req, res) => {
    const proyectos = leerProyectos();
    res.json(proyectos);
});
app.get('/proyectos/:id', (req, res) => {
    const proyectos = leerProyectos();
    const id = parseInt(req.params.id);
    const proyecto = proyectos.find(p => p.id === id);
    if (proyecto) {
        res.json(proyecto);
    } else {
        res.status(404).json({ message: 'Proyecto no encontrado' });
    }
});
app.post('/proyectos', (req, res) => {
    const proyectos = leerProyectos();
    const { nombre, responsable, estado, avance } = req.body;
    const id = proyectos.length > 0 ? proyectos[proyectos.length - 1].id + 1 : 1;

    const nuevoProyecto = new Proyecto(id, nombre, responsable, estado || 'Pendiente', avance || 0);
    proyectos.push(nuevoProyecto);
    guardarProyectos(proyectos);
    res.status(201).json(nuevoProyecto);
});
app.put('/proyectos/:id', (req, res) => {
    const proyectos = leerProyectos();
    const id = parseInt(req.params.id);
    const index = proyectos.findIndex(p => p.id === id);
    if (index !== -1) {
        const proyecto = proyectos[index];
        const { nombre, responsable, estado, avance } = req.body;
        proyectos[index] = {
            ...proyecto,
            nombre: nombre !== undefined ? nombre : proyecto.nombre,
            responsable: responsable !== undefined ? responsable : proyecto.responsable,
            estado: estado !== undefined ? estado : proyecto.estado,
            avance: avance !== undefined ? avance : proyecto.avance,
        };
        guardarProyectos(proyectos);
        res.json(proyectos[index]);
    } else {
        res.status(404).json({ message: 'Proyecto no encontrado' });
    }
});
app.delete('/proyectos/:id', (req, res) => {
    let proyectos = leerProyectos();
    const id = parseInt(req.params.id);
    const originalLength = proyectos.length;
    proyectos = proyectos.filter(p => p.id !== id);
    if (proyectos.length === originalLength) {
        res.status(404).json({ message: 'Proyecto no encontrado' });
        return;
    }
    guardarProyectos(proyectos);
    res.json({ message: 'Proyecto eliminado' });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor API REST ejecutándose en http://localhost:${PORT}`);
});
