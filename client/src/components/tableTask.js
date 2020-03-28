import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { setObjectTable, setOrderBy, setName, setDataGraph, setDetailTask } from '../action/index';
import { connect } from 'react-redux';

const axios = require('axios');

function TableTask(props) {

  // Eliminacion de una tabla y hacer la actualizacion de la tabla
  const eliminarTarea = id => {
    axios.delete(`/task/${id}`)
    .then((res) => {
      console.log(res.data);
      alert("borrada correctamente");
      axios.get(`/task?order=${props.orderBy}`)
        .then( (res) =>{
          props.setObjectTable({
            ...res.data.task
          })
      });
    });
  }
  

  const nameHistory = (name, id) => {
    // pausar el temporizador
    props.funp();
    //actualizar datos
    props.fun();  // Al seleccionar un nombre empieza luego luego el temporizador de la tarea
    props.setName(name); 
    axios.get(`/task/${name}`) // Asignar datos a redux para poder ver detalles e informacion de grafica
      .then( (res) =>{
        props.setDataGraph(res.data.task );
      });
    axios.get(`/taskid/${id}`)
    .then( (res) =>{
      props.setDetailTask({
        status:res.data.task[0].status,
        _id:res.data.task[0]._id,
        name:res.data.task[0].name,
        description:res.data.task[0].description,
        time:res.data.task[0].time,
        day:res.data.task[0].day,
        date:res.data.task[0].date,
        timeRemain:res.data.task[0].timeRemain,
      });
    });  
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Duracion(min)</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Id tarea</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody> 
          {props.rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" onClick={ () => nameHistory(row.name,row._id)}>
                {row.name}
              </TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.status ? 'FINALIZADA': 'EN CURSO'}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell >{row._id}</TableCell>
              <TableCell >
                <Button variant="outlined" color="primary" onClick={() => eliminarTarea(row._id)}>
                  Eliminar X
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = ({ orderBy }) => ({
  orderBy,
});

const mapDispatchToProps = dispatch => ({
  setObjectTable: value => dispatch(setObjectTable(value)),
  setOrderBy: value => dispatch(setOrderBy(value)),
  setName: value => dispatch(setName(value)),
  setDataGraph: value => dispatch(setDataGraph(value)),
  setDetailTask: value => dispatch(setDetailTask(value)),

});

export default connect(mapStateToProps, mapDispatchToProps)(TableTask);
