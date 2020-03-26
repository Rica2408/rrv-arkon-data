import React, { Component } from 'react';
import './App.css';
import Grafica from './components/grafica';
import Formulario from './components/formulario'; 
import Tabla from './components/tabla';
import { setObjetoTabla } from '../src/action/index';
import { connect } from 'react-redux';
import Editar from './components/editar';

const axios = require('axios');
const qs = require('querystring')

class App extends Component {

  

  lol = () => {
    const requestBody = {
      name:'Susana',
      description: 'lool',
      time: '1hour,'
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    //Crear Tarea
    // axios.post('/task',qs.stringify(requestBody), config)
    //   .then( (res) =>{
    //     console.log(res.data)
    //   });
    // Hacer un update  
    // axios.put('/task/5e7ba59000e44759223e9e42',qs.stringify(requestBody), config)
    // .then( (res) =>{
    //   console.log(res.data)
    // });
    // Eliminacion de tarea
    // axios.delete('/task/5e7ba59000e44759223e9e42')
    // .then( (res) =>{
    //   console.log(res.data)
    // });
    // Mostrar Lista

    axios.get(`/task?order=${this.props.orderBy}`)
    .then( (res) =>{
      this.props.setObjetoTabla({
        ...res.data.task})
    });
  }

  componentDidMount(){
    {this.lol()}
  }
  render(){
    return (
      <div className="App">
          
        <div className="formas">
          <Formulario/>
          <Editar/>
        </div>
        <Grafica/>
        <Tabla rows = {Object.values(this.props.objetoTabla)} />
      </div>
    )
  }
}

const mapStateToProps = ({objetoTabla, orderBy}) => ({
  objetoTabla,
  orderBy,
});

const mapDispatchToProps = dispatch => ({
  setObjetoTabla: value => dispatch(setObjetoTabla(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
