import React from 'react'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { setObjectTable, setDataGraph, setOrderBy} from '../action/index';

const axios = require('axios');

const FilterTask = (props) => {  
    // funciones para filtrar la base de datos
   
    
    const estado = () => {
        props.setOrderBy('status');
        axios.get(`/task?order=status`)
        .then( (res) =>{
            props.setObjectTable(
            res.data.task )
        });
      }
    
    const fecha = () => {
        props.setOrderBy('date');
        axios.get(`/task?order=date`)
        .then( (res) =>{
            props.setObjectTable(
            res.data.task )
        });
      }
    
    const nombre = () => {
        props.setOrderBy('name');
        axios.get(`/task?order=name`)
        .then( (res) =>{
            props.setObjectTable(
            res.data.task )
        });
      }

    const tareasCompletas = () => {
        props.setOrderBy('name');
        axios.get(`/taskCom`)
        .then( (res) =>{
            props.setObjectTable(
            res.data.task )
        });
      }
    return (
        <div className="filtros">
            
            
            <Button className="botonfiltro" onClick={fecha} variant="contained" color="primary">
                Fecha
            </Button>
            <Button className="botonfiltro" onClick={nombre} variant="contained" color="primary">
                Nombre
            </Button>
            <Button className="botonfiltro" onClick={estado} variant="contained" color="primary">
                Estatus
            </Button>
            <Button className="botonfiltro" onClick={tareasCompletas} variant="contained" color="primary">
                Tareas completadas
            </Button>
        </div>
    )
}

const mapStateToProps = ({objectTable, orderBy, name, detailTask}) => ({
    objectTable,
    orderBy,
    name,
    detailTask,
  });
  
  const mapDispatchToProps = dispatch => ({
    setObjectTable: value => dispatch(setObjectTable(value)),
    setDataGraph: value => dispatch(setDataGraph(value)),
    setOrderBy: value => dispatch(setOrderBy(value)),
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(FilterTask);