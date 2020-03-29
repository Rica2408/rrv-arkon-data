import React, { Component } from 'react';
import './App.css';
import GraphTask from './components/graphTask';
import FormTask from './components/formTask'; 
import FilterTask from './components/filterTask'; 
import TableTask from './components/tableTask';
import StateTask from './components/stateTask';
import { setObjectTable, setDataGraph, setOrderBy} from '../src/action/index';
import { connect } from 'react-redux';
import Editar from './components/editTask';
import { createObject } from './functions/createObj';
import Button from '@material-ui/core/Button';

const qs = require('querystring');
const axios = require('axios');

class App extends Component {

  viewTable = () => {
    axios.get(`/task?order=${this.props.orderBy}`)
    .then( (res) =>{
      this.props.setObjectTable(
        res.data.task )
    });
  }

  createFifty = () => {
    const obj=createObject();
    let newObj;
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    console.log(obj)
    for (let i = 0; i < obj.length; i++) {
      newObj = {
        description: obj[i].description,
        status: true,
        date: "",
        day: obj[i].day,
        timeRemain: "0",
        time: obj[i].time,
        name: obj[i].name,
        createFunct: obj[i].createFunct,
      }
      if(i === obj.length-1){
        axios.post('/task',qs.stringify(newObj), config)
            .then( (res) =>{
              this.props.setObjectTable({
                ...res.data.task})
                axios.get(`/task?order=${this.props.orderBy}`)
                  .then( (res) =>{
                    this.props.setObjectTable({
                      ...res.data.task})
                  });
            }); 
      }
      else{
        axios.post('/task',qs.stringify(newObj), config)
            .then( (res) =>{
              this.props.setObjectTable({
                ...res.data.task})
            }); 
      }
    }
  }
      
  deleteFifty = () => {
        
    axios.get('/taskDelete')
      .then( (res) => {
        for (let i = 0; i < res.data.task.length; i++) {

          if(i === res.data.task.length-1){
            axios.delete(`/task/${res.data.task[i]._id}`)
              .then((res) => {
                console.log(res.data);
                alert("borradas correctamente");
                    axios.get(`/task?order=${this.props.orderBy}`)
                      .then( (res) =>{
                        this.props.setObjectTable({
                          ...res.data.task
                        })
                    });
            });

          } else {
            axios.delete(`/task/${res.data.task[i]._id}`)
                  .then((res) => {
                    console.log(res.data);
                });
          }
        }
      })         
    
  }

  
    componentDidMount(){
      this.viewTable();
      
    }
    render(){
      return (
      
      <div className="App">
          
        <div className="formas">
          <FormTask/>
          <Editar/>
          <GraphTask />
          <StateTask/>
        </div>
          <Button className="botonfiltro" variant="outlined" color="primary" onClick={this.createFifty}>
            Crear 50 tarea
          </Button>
          <Button className="botonfiltro" variant="outlined" color="primary" onClick={this.deleteFifty}>
            Eliminar tareas por funcion
          </Button>
          
          <h1>Filtrar por:</h1>
          <FilterTask/>
        <TableTask rows = {Object.values(this.props.objectTable)} />
      </div>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
