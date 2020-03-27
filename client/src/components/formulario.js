import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { setObjetoTabla } from '../action/index';
import { connect } from 'react-redux';
const axios = require('axios');
const qs = require('querystring');


function Formulario(props) {
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

  const dia = () => {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
  }

  const lol = () =>{
    const requestBody = {
        name: document.getElementById('name').value,
        time: tiempoTareaD,
        description: document.getElementById('description').value,
        day: dia(),
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
        console.log(res.data);
        axios.get(`/task?order=name`)
          .then( (res) =>{
            props.setObjetoTabla({
              ...res.data.task})
          });
      });

      
  }
  return (
      <div className="formulario">
      <h1>Crear tarea</h1>
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

const mapStateToProps = ({objetoTabla, orderBy}) => ({
  objetoTabla,
  orderBy,
});

const mapDispatchToProps = dispatch => ({
  setObjetoTabla: value => dispatch(setObjetoTabla(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Formulario);
