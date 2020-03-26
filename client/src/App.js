import React from 'react';
import './App.css';
import Grafica from './components/grafica';
import Formulario from './components/formulario'; 
import Tabla from './components/tabla';
const axios = require('axios');
const qs = require('querystring')

function App () {

  const [objetoTabla, setObjetoTabla] = React.useState('jj');

  const lol = () => {
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
    console.log('entraa')
    console.log(objetoTabla)
    axios.get('/task')
    .then( (res) =>{
      console.log(res.data.task)
      setObjetoTabla(res.data.task)
      console.log(objetoTabla)
    });
  }
    return (
      <div className="App">
        
        <button onClick={lol}>Nuevo</button>
        <Grafica/>
        <Formulario/>
        <Tabla rows = {[{
          nombre: 'Ricardo',
          duracion: '30',
          descripcion: 'React'
        },
        {
          nombre: 'Sharon',
          duracion: '24',
          descripcion: 'leeel'
        },
        
        ]} />
      </div>
    )
  }

export default App;
