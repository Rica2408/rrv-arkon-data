import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { setObjectTable } from '../action/index';
import { connect } from 'react-redux';
import { inputData } from './../functions/datosInput';
const axios = require('axios');
const qs = require('querystring');

function FormTask(props) {


 const [value, setValue] = React.useState('Controlled');
 
  const handleChange = event => {
    setValue(event.target.value);
  };
  // Campos posible
  const tiempoTarea = inputData();

  const [tiempoTareaD, setTiempoTareaD] = React.useState('30');
  const handleChanges = event => {
      setTiempoTareaD(event.target.value);
  }

  // funcion para saber el dia que se hizo la tarea retorna un el numero del dia del año
  const dia = () => {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
  }

  // Funcion para craear una nueva tarea
  const createTask = () =>{

    
      const requestBody = {
          name: document.getElementById('nameform').value,
          time: tiempoTareaD,
          description: document.getElementById('desForm').value,
          day: dia(),
          status: false,
        }
    
        console.log(requestBody);
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      
      // se crea una tarea y se actualiza la tabla segun con el orden predeterminado que se tenga
      // segun la variable en redux orderBy
      axios.post('/task',qs.stringify(requestBody), config)
        .then( (res) =>{
          console.log(res.data);
          axios.get(`/task?order=${props.orderBy}`)
            .then( (res) =>{
              props.setObjectTable({
                ...res.data.task})
            });
        })
        .catch( (err) =>{
          alert("Faltan datos por ingresar")
        })

      document.getElementById("nameform").value = "";
      document.getElementById("durationForm").value = "";
      document.getElementById("desForm").value = ""; 
  }

  return (
      <div className="formulario">
      <h1>Crear tarea</h1>
        <ul>
            <li><TextField
              id="nameform"
              label="Nombre"
              multiline
              rowsMax="4"
              onChange={handleChange}
            /></li>
            <li><TextField
              id="durationForm"
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
                id="desForm"
                label="Descripcion Tarea"
                multiline
                rows="4"
                variant="outlined"
            /></li>            
        </ul>
        <Button className="botonFormulario" onClick={createTask} variant="contained" color="primary">
            Subir Tarea
        </Button>
      </div>
  );
}

const mapStateToProps = ({objectTable, orderBy}) => ({
  objectTable,
  orderBy,
});

const mapDispatchToProps = dispatch => ({
  setObjectTable: value => dispatch(setObjectTable(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormTask);
