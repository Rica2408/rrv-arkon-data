import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { setObjectTable } from '../action/index';
import { connect } from 'react-redux';
import { inputData } from './../functions/datosInput';

const axios = require('axios');
const qs = require('querystring');

function EditTask( props ) {
    const [value, setValue] = React.useState('Controlled');

    const handleChange = event => {
        setValue(event.target.value);
    };
    // valores del selector para elegir el tiempo de la tarea
    const timeTask = inputData();

    // asignacion del valor predeterminado
    const [tiempoTareaD, setTiempoTareaD] = React.useState('30');
    
    const handleChanges = event => {
        setTiempoTareaD(event.target.value);
    }

    const editTask = () =>{
       
        //tomar valores del formulario para hacer peticiones a la API
        let id = document.getElementById('idUpdate').value;
    
        const requestBody = {
            time: tiempoTareaD,
            description: document.getElementById('descriptionUpdate').value,
        }
    
        console.log(requestBody);
        const config = {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        // Hacer un el cambio y  update de la tabla 
        axios.put(`/task/${id}`,qs.stringify(requestBody), config)
        .then( (res) =>{
            console.log(res.data);
            axios.get(`/task?order=${props.orderBy}`)
            .then( (res) =>{
                props.setObjectTable({
                ...res.data.task})
            }); 
        })
        .catch((err) =>{
            alert("Complete el ID de la tarea o el ID no existe")
        });

        document.getElementById("idUpdate").value = "";
        document.getElementById("durations").value = "";
        document.getElementById("descriptionUpdate").value = ""; 

    }

    return (
        <div className="formulario">
        <h1>Editar</h1>
            <ul>
                <li><TextField
                    id="idUpdate"
                    label="Id Tarea"
                    multiline
                    rowsMax="4"
                    onChange={handleChange}
                /></li>
                <li><TextField
                    id="durations"
                    select
                    label="Tiempo"
                    onChange={handleChanges}
                    helperText="Seleccione la duracion de la tarea"
                >
                    {timeTask.map(option => (
                        <MenuItem id="menuItemUpdate" key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField></li>
                <li><TextField
                    id="descriptionUpdate"
                    label="Descripcion Tarea"
                    multiline
                    rows="4"
                    variant="outlined"
                /></li>            
            </ul>
            <Button className="botonFormulario" onClick={editTask} variant="contained" color="primary">
                Editar tarea
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
    
export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
    