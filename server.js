const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

require('./config/config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
//definicion de rutas
app.use(require('./routes/index'));

//Servidor estatico en produccion
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.use('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}


// parse application/json
app.use(bodyParser.json());
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },(err, res) => {
      if(err) throw err;
      console.log("MongooDB conectada")
  });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server start in port ${PORT}`);
})