import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import { setDataGraph } from '../action/index';

class Grafica extends Component {

    dia = () => {
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        return day;
    }

    pruebas = () =>{

        //sacar el dia de hoy
        let diaHoy = this.dia();
        console.log(diaHoy);
        let semanaPasada = diaHoy-7;
        let diasTotales = 7;
        let dia;
        let diaSemana;
        let lunes = 0;
        let martes = 0;
        let miercoles = 0;
        let jueves = 0;
        let viernes = 0;
        console.log("Siiii");
        let objeto = Object.values(this.props.dataGraph);
        if(objeto == ''){
            console.log("es indefinido")
        }
        else{
            for (let i = 0; i < objeto.length; i++) {
                dia=objeto[i].day;
                if(dia > semanaPasada){
                    // funcion para la semana pasada de actividades
                    // primer 1 dia del año fue miercoles
                    // Se usara % (modulo)para saber que dia es 
                    
                    diaSemana = dia % diasTotales;
                    if(diaSemana === 1) miercoles++;
                    if(diaSemana === 2) jueves++;
                    if(diaSemana === 3) viernes++;
                    if(diaSemana === 6) lunes++;
                    if(diaSemana === 0) martes++;   
                }
            }
            const data = [
                {quarter: 1, tareas: lunes},
                {quarter: 2, tareas: martes},
                {quarter: 3, tareas: miercoles},
                {quarter: 4, tareas: jueves},
                {quarter: 5, tareas: viernes},
              ];
            return data;
        }
    }
    render() {
        return (
            <div className="grafica">
                <h1>{this.props.name}</h1>
                <VictoryChart style={{ parent: { maxWidth: "450px" } }}
                    domainPadding={20}
                >
                    <VictoryAxis
                        label="NUmero de tarea en la ultima semana"
                        tickValues={[1, 2, 3, 4, 5]}
                        tickFormat={["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (`${x}`)}
                    />
                    <VictoryBar
                        data={this.pruebas()}
                        x="quarter"
                        y="tareas"
                    />
                </VictoryChart>
            </div>
        )
    }
}

const mapStateToProps = ({ name, dataGraph }) => ({
    name,
    dataGraph
});


const mapDispatchToProps = dispatch => ({
    setDataGraph: value => dispatch(setDataGraph(value)),

});
  
export default connect(mapStateToProps, mapDispatchToProps)(Grafica);
