import React, { Component } from 'react';
import './App.css';
const axios = require('axios');
const qs = require('querystring')
class App extends Component {

  lol = () =>{

    const requestBody = {
      name:'Ricardo',
      description: 'lool',
      time: '1hour,'
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    axios.post('/task',qs.stringify(requestBody), config)
      .then( (res) =>{
        console.log(res.data)
      });

  
  }
  
  render(){
    return (
      <div className="App">
        <button onClick={this.lol}>Nuevo</button>
      </div>
    );
    }
  }

export default App;
