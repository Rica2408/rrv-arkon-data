

export const createObject = () =>{

    const names = [
        "Gabriela",
        "Hector",
        "Rodrigo",
        "Ricardo",
        "Isreal",
        "Vienay",
        "Ivan",
        "Fernando"
    ];

    const descriptions = [
        "hacer deploy",
        "migracion de bases de datos",
        "arreglar estilos",
        "docuemntacion de nuevo proyecto",
        "arreglar funcionalidades de botonos",
        "leer documentacion",
        "manetenimiento de computadoras",
        "instalacion de programas",
        "modelos de bases de datos",
        "diagramas de flujo",
        "diseño de la arquitectura",
    ];

    const dia = () => {
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        return day;
      }
    let diahoy = dia();
    let leeel = [];
    let obj;

    for (let i = 0; i < 50; i++) {
        obj = {
                name: names[Math.floor(Math.random() * 8)],
                description: descriptions[Math.floor(Math.random() * 11)],
                time: Math.floor(Math.random() * 120)+1,
                status: true,
                date:"",
                day: diahoy - Math.floor(Math.random() * 7),
                timeRemain: "0",
                createFunct: true,
            }

        leeel.push(obj);
    }
    return(leeel)
}
