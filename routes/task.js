const express = require('express');
const router = express.Router();
const  Task = require('../models/task');
router.post('/task', (req, res) => {
    let body = req.body;
    let task = new Task ({
        name: body.name,
        description: body.description,
        time: body.time,
    });

    task.save((err, taskDB) =>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            task: taskDB
        })
    });

});


module.exports = router;