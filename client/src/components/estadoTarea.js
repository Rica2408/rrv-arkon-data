import React, { Component } from 'react';
import Countdown from 'react-countdown';
import { connect } from 'react-redux';
import { setObjetoTabla } from '../action/index';
import Button from '@material-ui/core/Button';

const qs = require('querystring');
const axios = require('axios');

class EstadoTarea extends Component {
    
    
    render() {
        const { refCallback, time } = this.props;
        const Completionist = () => <div>
                    <p>Nombre: {this.props.detailTask.name}</p>
                    <p>Id Tarea: {this.props.detailTask._id}</p>
                    <p>Descripcion: {this.props.detailTask.description}</p>
                    <p>Fecha Inicio: {this.props.detailTask.date}</p>
                    <p>Estimacion Tolal: {this.props.detailTask.time}</p>
        </div>;
        var tiempoRes;
        var status = this.props.detailTask.status;
        let requestBody;

        const actualizar = (id,resultado) => {
            if(resultado === "0"){
                requestBody = {
                    status:true,
                    timeRemain: resultado,
                }
            }
            else{
                requestBody = {
                    status: false,
                    timeRemain: resultado,
                }
            }
    
            console.log(requestBody);
            const config = {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            axios.put(`/task/${id}`,qs.stringify(requestBody), config)
                .then( (res) =>{
                    console.log(res.data);
                    axios.get(`/task?order=${this.props.orderBy}`)
                        .then( (res) =>{
                            this.props.setObjetoTabla({
                                ...res.data.task})
                    }); 
           });

        }
        const renderer = ({ hours, minutes, seconds, completed }) => {
            if (completed && status === false) {
              // Render a complete state
                let id = this.props.detailTask._id;
                actualizar(id,"0");
              
              return <Completionist />;
            } 
            
            if(status){
                return <Completionist />;
            }
            else {
              tiempoRes=minutes;
              return (
                <div>
                    <p>Nombre: {this.props.detailTask.name}</p>
                    <p>Id Tarea: {this.props.detailTask._id}</p>
                    <p>Descripcion: {this.props.detailTask.description}</p>
                    <p>Fecha Inicio: {this.props.detailTask.date}</p>
                    <p>Estimacion Tolal: {this.props.detailTask.time}</p>
                    <br/>
                    <p>Tiempo faltante: {hours}:{minutes}:{seconds}</p>
                    <br/>
                    <Button className="statusBoton" onClick={lol} variant="contained" color="primary">
                        Empezar
                    </Button>
                    <Button className="statusBoton" onClick={lel} variant="contained" color="primary">
                        Parar
                    </Button> 
                    <Button className="statusBoton" onClick={lal} variant="contained" color="primary">
                        Restablecer
                    </Button>
                </div>
              );
            }
        };

        const lol = () =>{
            this.props.startfun();
        }

        const lel = () =>{
            actualizar(this.props.detailTask._id,tiempoRes)
            this.props.stopfun();
        }

        const lal = () =>{
            console.log("hace algo")
            actualizar(this.props.detailTask._id,this.props.detailTask.time)
        }

        return (
            <div className="formulario centrado">
                <h3>Nombre:{this.props.detailTask.name}</h3>
                
            <Countdown
                ref={refCallback} 
                date={Date.now() + (time * 1000 * 60)}
                intervalDelay={3}
                zeroPadTime={2}
                autoStart={false}
                renderer={renderer}
                daysInHours
            /> 
            </div>
        );
    }
}

const mapStateToProps = ({ detailTask, orderBy }) => ({
    detailTask,
    orderBy
});

const mapDispatchToProps = dispatch => ({
    setObjetoTabla: value => dispatch(setObjetoTabla(value)),  
});

export default connect(mapStateToProps, mapDispatchToProps)(EstadoTarea);
