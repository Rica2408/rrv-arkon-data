const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    day: {
        type: String,
        required: false,
    },
    timeRemain:{
        type: String,
        required: false,
    },
    createFunct:{
        type: Boolean,
        required: false,
    }
});

module.exports = Task = mongoose.model('task', TaskSchema);