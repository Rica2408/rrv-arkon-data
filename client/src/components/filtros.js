import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { setObjetoTabla, setDataGraph, setOrderBy} from '../action/index';

const axios = require('axios');
const Filtros = (props) => {  
    const duracion = () => {
        props.setOrderBy('time');
        axios.get(`/task?order=time`)
        .then( (res) =>{
            props.setObjetoTabla(
            res.data.task )
        });
      }
    
    const estado = () => {
        props.setOrderBy('status');
        axios.get(`/task?order=status`)
        .then( (res) =>{
            props.setObjetoTabla(
            res.data.task )
        });
      }
    
    const fecha = () => {
        props.setOrderBy('date');
        axios.get(`/task?order=date`)
        .then( (res) =>{
            props.setObjetoTabla(
            res.data.task )
        });
      }
    
    const nombre = () => {
        props.setOrderBy('name');
        axios.get(`/task?order=name`)
        .then( (res) =>{
            props.setObjetoTabla(
            res.data.task )
        });
      }

    const tareasCompletas = () => {
        props.setOrderBy('name');
        axios.get(`/taskCom`)
        .then( (res) =>{
            props.setObjetoTabla(
            res.data.task )
        });
      }
    return (
        <div className="filtros">
            
            <Button className="botonfiltro" onClick={duracion} variant="contained" color="primary">
                Duracion
            </Button>
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

const mapStateToProps = ({objetoTabla, orderBy, name, detailTask}) => ({
    objetoTabla,
    orderBy,
    name,
    detailTask,
  });
  
  const mapDispatchToProps = dispatch => ({
    setObjetoTabla: value => dispatch(setObjetoTabla(value)),
    setDataGraph: value => dispatch(setDataGraph(value)),
    setOrderBy: value => dispatch(setOrderBy(value)),
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Filtros);