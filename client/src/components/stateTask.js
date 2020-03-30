import React from 'react';
import { connect } from 'react-redux';
import { setObjectTable } from '../action/index';
import Button from '@material-ui/core/Button';

const qs = require('querystring');
const axios = require('axios');

function StateTask (props) {

    var time_in_minutes = props.detailTask.timeRemain;    
    var current_time = Date.parse(new Date());
    var status = props.detailTask.status;
    var deadline = new Date(current_time + time_in_minutes*60*1000);
    var timeinterval;
    var paused = false; // is the clock paused?
    var time_left; // time left on the clock when paused

    function time_remaining(endtime){
        
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
    }
    
    function run_clock(id,endtime){
        if(status === false){

            var clock = document.getElementById(id);
            function update_clock(){
                var t = time_remaining(endtime);
                if(clock){
                    document.getElementById("phrs").innerHTML = 'Horas: ';
                    document.getElementById("horas").innerHTML = t.hours;
                    clock.innerHTML = t.minutes;
                    document.getElementById("pmin").innerHTML = ' minutos: ';
                    document.getElementById("segundos").innerHTML = ' segundos: '+t.seconds;
                    if(t.total<=0){
                         clearInterval(timeinterval); 
                         actualizar(props.detailTask._id,"0");
                         
                    }
                }
            }
            update_clock(); // run function once at first to avoid delay
            timeinterval = setInterval(update_clock,1000);
        } else{
            clock = document.getElementById(id);
            if(clock){
                document.getElementById("phrs").innerHTML = ' Tarea terminada ';
                document.getElementById("horas").innerHTML = '';
                document.getElementById("pmin").innerHTML = '';
                document.getElementById("segundos").innerHTML = '';
                document.getElementById("minutos").innerHTML = '';
          
            }
        }
    }

    function pause_clock(){
        if(!paused){
            paused = true;
            clearInterval(timeinterval); // stop the clock
            time_left = time_remaining(deadline).total; // preserve remaining time
            let tiempo = time_remaining(deadline).hours * 60 + time_remaining(deadline).minutes;
            console.log("puesa");
            console.log(tiempo);
            actualizar(props.detailTask._id, tiempo);
            console.log()
        }
    }
    run_clock('minutos',deadline);


    var requestBody;
    const actualizar = (id,resultado) => {

            if(resultado == "0"){
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
                    axios.get(`/task?order=${props.orderBy}`)
                        .then( (res) =>{
                            props.setObjectTable({
                                ...res.data.task})
                    }); 
           });
        }

    function resume_clock(){
        if(paused){
            paused = false;
    
            // update the deadline to preserve the amount of time remaining
            deadline = new Date(Date.parse(new Date()) + time_left);
    
            // start the clock
            run_clock('minutos',deadline);
        }
    }
    
    // handle pause and resume button clicks
    var lql =document.getElementById('pause');
    if(lql){

        document.getElementById('pause').onclick = pause_clock;
        document.getElementById('resume').onclick = resume_clock;
    }

    const restablecer = () =>{
        pause_clock();
        actualizar(props.detailTask._id,props.detailTask.time)
    }

    const terminar = () =>{
        pause_clock();
        document.getElementById("minutos").innerHTML = '0';
        actualizar(props.detailTask._id,"0")

    }


    return (
        <div className="formulario centrado" >
            <div id="count">
                <a id="phrs"></a>
                <a id="horas"></a>
                <a id="pmin"></a>
                <a id="minutos"></a>
                <a id="segundos"></a>
            </div>    
            <p>Nombre: {props.detailTask.name}</p>
            <p>Id Tarea: {props.detailTask._id}</p>
            <p>Descripcion: {props.detailTask.description}</p>
            <p>Fecha Inicio: {props.detailTask.date}</p>
            <p>Estimacion Tolal: {props.detailTask.time}</p>
            <br />
            <span id="timer"></span>
            <br />
            {props.detailTask.status === true ? <h3>Tarea Finalizada</h3> :
                (
                    <div>
                        <Button className="statusBoton" id="resume" variant="contained" color="primary">
                            Empezar
                        </Button>
                        <Button className="statusBoton" id="pause" variant="contained" color="primary">
                            Parar
                        </Button>
                        <Button className="statusBoton" onClick={terminar} variant="contained" color="primary">
                            Terminar tarea
                        </Button>
                        <Button className="statusBoton" onClick={restablecer} variant="contained" color="primary">
                            Restablecer
                        </Button>
                    </div>    
                        
                )

                    
            }
        </div>
    );
    
}


const mapStateToProps = ({ detailTask, orderBy }) => ({
    detailTask,
    orderBy
});

const mapDispatchToProps = dispatch => ({
    setObjectTable: value => dispatch(setObjectTable(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StateTask);
