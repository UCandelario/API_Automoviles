const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let vehiculos = [];

app.get('/vehiculos', (req, res) => {
    res.json({ vehiculos: vehiculos });
});

app.get('/vehiculos/:placa', (req, res) => {
    const placa = req.params.placa;
    const vehiculo = vehiculos.find(v => v.placa === placa);
    
    if (vehiculo) {
        res.json({ tipo: 'busqueda', vehiculo: vehiculo });
    } else {
        res.status(404).json({ tipo: 'error', mensaje: 'Vehículo no encontrado' });
    }
});

app.post('/vehiculos', (req, res) => {
    const { placa, marca, modelo } = req.body;

    if (vehiculos.some(v => v.placa === placa)) {
        return res.status(400).json({ tipo: 'error', mensaje: 'Vehículo con la misma placa ya existe' });
    }

    const nuevoVehiculo = { placa, marca, modelo };
    vehiculos.push(nuevoVehiculo);
    res.json({ tipo: 'agregar', vehiculo: nuevoVehiculo });
});

app.delete('/vehiculos/:placa', (req, res) => {
    const placa = req.params.placa;
    const indice = vehiculos.findIndex(v => v.placa === placa);

    if (indice !== -1) {
        vehiculos.splice(indice, 1);
        res.json({ tipo: 'delete' });
    } else {
        res.status(404).json({ tipo: 'error', mensaje: 'Vehículo no encontrado' });
    }
});

app.listen(3000, () => {
    console.log('Escuchando en puerto 3000');
});
