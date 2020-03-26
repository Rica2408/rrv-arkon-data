import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { setObjetoTabla } from '../action/index';
import { connect } from 'react-redux';
const axios = require('axios');
const qs = require('querystring')

function Editar( props ) {
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

    const editarTarea = () =>{
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

        // Hacer un update  
        axios.put(`/task/${id}`,qs.stringify(requestBody), config)
        .then( (res) =>{
            console.log(res.data);
            axios.get(`/task?order=${props.orderBy}`)
            .then( (res) =>{
                props.setObjetoTabla({
                ...res.data.task})
            }); 
        });

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
                id="duration"
                select
                label="Tiempo"
                onChange={handleChanges}
                helperText="Seleccione la duracion de la tarea"
                >
                    {tiempoTarea.map(option => (
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
            <Button className="botonFormulario" onClick={editarTarea} variant="contained" color="primary">
                Editar tarea
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
    
export default connect(mapStateToProps, mapDispatchToProps)(Editar);
    