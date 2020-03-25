const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./config/config');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
//definicion de rutas
app.use(require('./routes/index'));

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

app.get('/',(req,res) =>res.send('Api running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server start in port ${PORT}`);
})