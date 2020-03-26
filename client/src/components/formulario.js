import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
const axios = require('axios');
const qs = require('querystring')


export default function Formulario() {
 const [value, setValue] = React.useState('Controlled');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const tiempoTarea = [
    {
        value: '30',
        label: 'Corta'
    },
    {
        value: '45',
        label: 'Mediana'
    },
    {
        value: '60',
        label: 'Larga'
    }
  ];

  const [tiempoTareaD, setTiempoTareaD] = React.useState('30');
  const handleChanges = event => {
      setTiempoTareaD(event.target.value);
  }

  const lol = () =>{
    const requestBody = {
        name: document.getElementById('name').value,
        time: tiempoTareaD,
        description: document.getElementById('description').value,
      }
  
      console.log(requestBody);
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    // Crear Tarea
    axios.post('/task',qs.stringify(requestBody), config)
      .then( (res) =>{
        console.log(res.data)
      });
  }
  return (
      <div className="formulario">
        <ul>
            <li><TextField
            id="name"
            label="Nombre"
            multiline
            rowsMax="4"
            onChange={handleChange}
            /></li>
            <li><TextField
            id="duration"
            select
            label="Tiempo"
            onChange={handleChanges}
            helperText="Seleccione la duracion de la tarea"
            >
                {tiempoTarea.map(option => (
            <MenuItem id="menuItem" key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
            </TextField></li>
            <li><TextField
            id="description"
            label="Descripcion Tarea"
            multiline
            rows="4"
            variant="outlined"
            /></li>            
        </ul>
        <Button className="botonFormulario" onClick={lol} variant="contained" color="primary">
            Subir Tarea
        </Button>
      </div>
  );
}