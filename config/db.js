const mongoose = require('mongoose');
const config = require('config');

const connectDB =mongoose.connect('mongodb+srv://richie2408:or2ZUWf5a0ZzLVCm@cluster0-du9tx.mongodb.net/task?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },(err, res) => {
      if(err) throw err;
      console.log("base de datos online")
  });

module.exports = connectDB;
