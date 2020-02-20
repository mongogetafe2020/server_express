const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let clientes = [
    {
        id: 1, 
        nombre: 'Juan',
        apellidos: 'Fernández',
        dni: '07800900B'
    },
    {
        id: 2, 
        nombre: 'Laura',
        apellidos: 'Gómez',
        dni: '04800900B'
    },
    {
        id: 3, 
        nombre: 'Pedro',
        apellidos: 'Gómez',
        dni: '50800900B'
    }
]

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.status(200).json(clientes);
});

app.get('/:id', (req, res) => {

    let cliente = clientes.find(cliente => {
        return cliente.id == req.params.id;
    });

    res.status(200).json(cliente);
});

app.post('/', (req, res) => {

    let cliente = req.body;
    cliente.id = clientes[clientes.length - 1].id + 1;
    clientes.push(cliente);

    res.status(200).json({
        mensaje: 'El cliente se ha creado correctamente'
    });
    console.log(clientes);
});

app.put('/:id', (req, res) => {
  
    let posicion = clientes.findIndex(cliente => {
        return cliente.id == req.params.id;
    })
    if (posicion < 0) {
        res.status(200).json({
            mensaje: 'No existe el cliente'
        });
    } else {
        if(req.body.nombre !== undefined) {
            clientes[posicion].nombre = req.body.nombre;
        }
        if(req.body.apellidos !== undefined) {
            clientes[posicion].apellidos = req.body.apellidos;
        }
        if(req.body.dni !== undefined) {
            clientes[posicion].dni = req.body.dni;
        }
        res.status(200).json({
            mensaje: 'El cliente se ha actualizado correctamente'
        });
        console.log(clientes);
    }

});

app.delete('/:id', (req, res) => {
    let posicion = clientes.findIndex(cliente => {
        return cliente.id == req.params.id;
    })
    if (posicion < 0) {
        res.status(200).json({
            mensaje: 'No existe el cliente'
        });
    } else {
        clientes.splice(posicion, 1);
        res.status(200).json({
            mensaje: 'El cliente se ha eliminado correctamente'
        });
        console.log(clientes);
    }
});

app.listen(3000, () => console.log(`App escuchando en http://localhost:3000`));