import React, { Component } from 'react';
import './App.css';
import Grafica from './components/graphTask';
import Formulario from './components/formTask'; 
import Filtros from './components/filterTask'; 
import Tabla from './components/tableTask';
import StateTask from './components/stateTask';
import { setObjectTable, setDataGraph, setOrderBy} from '../src/action/index';
import { connect } from 'react-redux';
import Editar from './components/editTask';
import { createObject } from './functions/createObj';

const qs = require('querystring');
const axios = require('axios');

class App extends Component {
  clockRef = null;

  constructor(props) {
      super(props);
      this.setClockRef = this.setClockRef.bind(this);
      this.start = this.start.bind(this);
      this.pause = this.pause.bind(this);
  }
  start() {
    this.clockRef.start();
  }
  pause() {
      this.clockRef.pause();
  }
  setClockRef(ref) {
      this.clockRef = ref;
  }

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
  
      axios.post('/task',qs.stringify(newObj), config)
          .then( (res) =>{
            console.log(res.data);
          }); 
      }
        axios.get(`/task?order=${this.props.orderBy}`)
          .then( (res) =>{
            this.props.setObjectTable({
              ...res.data.task})
          });
        
      }
      
      deleteFifty = () => {
        
        axios.get('/taskDelete')
      .then( (res) => {
        for (let i = 0; i < res.data.task.length; i++) {
          axios.delete(`/task/${res.data.task[i]._id}`)
          .then((res) => {
            console.log(res.data);
            
          });
        }

        alert("borradas correctamente");
            axios.get(`/task?order=${this.props.orderBy}`)
              .then( (res) =>{
                this.props.setObjectTable({
                  ...res.data.task
                })
            });
      })         
    
  }
  componentDidMount(){
    this.viewTable()
  }
  render(){
    return (
      <div className="App">
          
        <div className="formas">
          <Formulario/>
          <Editar/>
          <Grafica />
          <StateTask refCallback={this.setClockRef} time={this.props.detailTask.timeRemain} startfun ={this.start} stopfun={this.pause} />
        </div>
          <button onClick={this.createFifty}> Crear 50 datos</button>
          <button onClick={this.deleteFifty}> Elimnar 50 datos por funcion</button>
          <h1>Filtrar por:</h1>
          <Filtros/>
        <Tabla fun ={this.start} funp={this.pause} rows = {Object.values(this.props.objectTable)} />
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
