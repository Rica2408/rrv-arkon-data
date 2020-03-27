import React, { Component } from 'react';
import './App.css';
import Grafica from './components/grafica';
import Formulario from './components/formulario'; 
import Tabla from './components/tabla';
import EstadoTarea from './components/estadoTarea';
import { setObjetoTabla, setDataGraph } from '../src/action/index';
import { connect } from 'react-redux';
import Editar from './components/editar';

const axios = require('axios');
const qs = require('querystring')

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
      this.props.setObjetoTabla({
        ...res.data.task})
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
          <EstadoTarea refCallback={this.setClockRef} time={this.props.detailTask.timeRemain} startfun ={this.start} stopfun={this.pause} />
        </div>
        <Tabla fun ={this.start} funp={this.pause} rows = {Object.values(this.props.objetoTabla)} />
      </div>
    )
  }
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
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
