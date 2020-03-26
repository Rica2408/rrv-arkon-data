import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { setObjetoTabla, setOrderBy } from '../action/index';
import { connect } from 'react-redux';

const axios = require('axios');

interface Props {
  rows: Array<{
    id: String,
    nombre: String,
    duracion: String,
    descripcion: String
  }>;
}
function Tabla(props) {

  const orderPor = [
    {
      value: 'name',
      label: 'Nombre'
    },
    {
      value: 'date',
      label: 'Fecha'
    },
    {
      value: 'time',
      label: 'Tiempo'
    }
  ];

  const [orden, setOrden] = React.useState('name');

  const handleChanges = event => {
    setOrden(event.target.value);

    if(event.target.value){
      props.setOrderBy(event.target.value);
    }
    else{
      props.setOrderBy('name');
    }
    console.log('estoo')
    console.log(props.orderBy);
    
    axios.get(`/task?order=${props.orderBy}`)
          .then( (res) =>{
            console.log("entra al order")
            props.setObjetoTabla({
              ...res.data.task})
          });
  }

  const eliminarTarea = id => {
      axios.delete(`/task/${id}`)
      .then((res) => {
        console.log(res.data);
        alert("borrada correctamente");

        axios.get('/task')
      .then( (res) =>{
        props.setObjetoTabla({
          ...res.data.task})
          console.log("si entro")
      });
      });

  }

  return (


    <TableContainer component={Paper}>
      <TextField
        id="duration"
        select
        label="Nombre"
        onClick={handleChanges}
        helperText="Ordernar Por"
      >
        {orderPor.map(option => (
          <MenuItem id="menuItem" key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Duracion</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Fecha Inicio</TableCell>
            <TableCell>Id tarea</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell >{row.date.toString()}</TableCell>
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
  setObjetoTabla: value => dispatch(setObjetoTabla(value)),
  setOrderBy: value => dispatch(setOrderBy(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabla);
