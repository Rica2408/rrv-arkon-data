import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import { setDataGraph } from '../action/index';

class GraphTask extends Component {

    //tomar el dia de hoy para hacer comparaciones
    dia = () => {
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        return day;
    }

    datos = () => {
        
        let diaHoy = this.dia();        // dia de hoy
        let semanaPasada = diaHoy - 7;  // Se creo esta variable para graficar la semana pasada con respecto al dia de hoy
        let diasTotales = 7;            // dias que tiene una semana
        let dia;                        
        let diaSemana;                  //numero que se asociara con algun dia de la semana ya se L M M J V 
        let lunes = 0;
        let martes = 0;
        let miercoles = 0;
        let jueves = 0;
        let viernes = 0;                // no se tuvo en consideracion los dias Sabados ni Domingos
        let objeto = Object.values(this.props.dataGraph);   // conversion de objeto
        if (objeto == '') {
            console.log("")
        }
        else {
            for (let i = 0; i < objeto.length; i++) {           // Se usa este FOR para tomar el conteo de tareas en un mismo dia
                dia = objeto[i].day;
                if (dia > semanaPasada) {
                    // funcion para la semana pasada de actividades
                    // primer 1 dia del año fue miercoles
                    // Se usara % (modulo)para saber que dia es 

                    diaSemana = dia % diasTotales;              // La variable diaSemana asocia el numero con un dia y hace el incremente
                    if (diaSemana === 1) miercoles++;
                    if (diaSemana === 2) jueves++;
                    if (diaSemana === 3) viernes++;
                    if (diaSemana === 6) lunes++;
                    if (diaSemana === 0) martes++;
                }
            }
            const data = [                                      // Se guardan los datos en un objeto para despues mostrarlos en la grafica
                { quarter: 1, tareas: lunes },
                { quarter: 2, tareas: martes },
                { quarter: 3, tareas: miercoles },
                { quarter: 4, tareas: jueves },
                { quarter: 5, tareas: viernes },
            ];

            return data;
        }
    }
    render() {
        const { name } = this.props;
        return (
            <div className="grafica">
                <h1>{name}</h1>
                <VictoryChart style={{ parent: { maxWidth: "450px" } }}             // Se especifican las dimensiones
                    domainPadding={20}                                                  
                >
                    <VictoryAxis
                        label="Numero de tarea en la ultima semana"                 //Se declaron los labels
                        tickValues={[1, 2, 3, 4, 5]}
                        tickFormat={["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (`${x} T`)}
                    />
                    <VictoryBar                         // Se ponen la informacion a mostrar
                        data={this.datos()}
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

export default connect(mapStateToProps, mapDispatchToProps)(GraphTask);
