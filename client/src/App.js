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

  lol = () => {
    axios.get(`/task?order=${this.props.orderBy}`)
    .then( (res) =>{
      this.props.setObjectTable(
        res.data.task )
    });
  }

  componentDidMount(){
    this.lol()
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
