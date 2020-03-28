import React, { Component } from 'react';
import Countdown from 'react-countdown';
import { connect } from 'react-redux';
import { setObjectTable } from '../action/index';
import Button from '@material-ui/core/Button';

const qs = require('querystring');
const axios = require('axios');

class StateTask extends Component {
    
    
    render() {
        const { refCallback, time, detailTask, orderBy } = this.props;
        // Componente cuando finaliza la tarea, cuando llega a '0'
        const Completionist = () => <div>
                <p>Nombre: {detailTask.name}</p>
                <p>Id Tarea: {detailTask._id}</p>
                <p>Descripcion: {detailTask.description}</p>
                <p>Fecha Inicio: {detailTask.date}</p>
                <p>Estimacion Tolal: {detailTask.time}</p>
            </div>;

        var tiempoRes;       // Guardar el tiempo restante
        var status = detailTask.status;  //si ya se realizo o no
        let requestBody;

        const actualizar = (id,resultado) => {
            if(resultado === "0"){
                requestBody = {
                    status:true,
                    timeRemain: resultado,
                }
            } else {
                requestBody = {
                    status: false,
                    timeRemain: resultado,
                }
            }
    
            const config = {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            axios.put(`/task/${id}`,qs.stringify(requestBody), config)
                .then( (res) =>{
                    console.log(res.data);
                    axios.get(`/task?order=${orderBy}`)
                        .then( (res) =>{
                            this.props.setObjectTable({
                                ...res.data.task})
                    }); 
           });
        }

        const renderer = ({ hours, minutes, seconds, completed }) => {
            
            if (completed && status === false) {
                //cuando termina el contador y el status es false
                let id = this.props.detailTask._id;
                actualizar(id,"0");
              
              return <Completionist />;
            } 
            
            if(status){
                return <Completionist />;
            }
            else {
                // Muestra los siguientes datos cuando no se ha terminado el contador y empieza a decrementar el tiempo

                tiempoRes=minutes;
                return (
                    <div>
                        <p>Nombre: {detailTask.name}</p>
                        <p>Id Tarea: {detailTask._id}</p>
                        <p>Descripcion: {detailTask.description}</p>
                        <p>Fecha Inicio: {detailTask.date}</p>
                        <p>Estimacion Tolal: {detailTask.time}</p>
                        <br/>
                        <p>Tiempo faltante: {hours}:{minutes}:{seconds}</p>
                        <br/>
                        <Button className="statusBoton" onClick={empezar} variant="contained" color="primary">
                            Empezar
                        </Button>
                        <Button className="statusBoton" onClick={pausar} variant="contained" color="primary">
                            Parar
                        </Button> 
                        {/* <Button className="statusBoton" onClick={completed = true} variant="contained" color="primary">
                            Restablecer
                        </Button> */}
                    </div>
              );
            }
        };

        const empezar = () =>{
            // Se manda a llamar la funcion start para decrementar
            this.props.startfun();
        }

        const pausar = () =>{
            // Se manda a llamar la funcion start para pausar
            actualizar(detailTask._id,tiempoRes)
            this.props.stopfun();
        }

        // const lal = () =>{
        //     console.log("hace algo")
        //     actualizar(this.props.detailTask._id,this.props.detailTask.time)
        // }

        return (
            <div className="formulario centrado">
            
                <Countdown
                    ref={refCallback} 
                    date={Date.now() + (time * 1000 * 60)}  // la variable time se toma de redux con respecto al valor de la duracion de la tarea
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
    setObjectTable: value => dispatch(setObjectTable(value)),  
});

export default connect(mapStateToProps, mapDispatchToProps)(StateTask);
