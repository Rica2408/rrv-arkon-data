export const inputData = () =>{

    let data =[{
        value: '30',
        label: 'Corta'
    },
    {
        value: '45',
        label: 'Mediana'
    },
    {
        value: '60',
        label: 'Larga'
    }];

    
    let dataAux;
    for (let i = 0; i < 120; i++) {
        dataAux = {
            value: i+1,
            label: i+1
        };
        data.push(dataAux)
    }

    return data;
}