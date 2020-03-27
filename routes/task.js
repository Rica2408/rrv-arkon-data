const express = require('express');
const router = express.Router();
const  Task = require('../models/task');


const dia = () => {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
}

//Crear nueva tarea
router.post('/task', (req, res) => {
    let body = req.body;
    let task = new Task ({
        name: body.name,
        description: body.description,
        time: body.time,
        day: dia(),
        timeRemain: body.time,
    });
    // Guardar en moongo DB
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

// Modificar o actualizar tarea
router.put('/task/:id', (req,res) =>{
    let id = req.params.id;
    let body = req.body;

    Task.findByIdAndUpdate(id, body, {new:true},(err,taskDB) =>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.json({
            ok:true,
            task: taskDB,
        });
    });
});

// Eliminiar tarea

router.delete('/task/:id', (req,res) =>{
    let id = req.params.id;

    Task.findByIdAndDelete(id,(err,taskDB) =>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.json({
            ok:true,
            task: "Eliminado correctamente",
        });
    });
});

// Mostrar traba de usuarios

router.get('/task' ,(req, res) => {
    
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 10;
    let order = req.query.order || 'name';
    desde = Number(desde);
    limite = Number(limite);
    //llamar parametros opcionares ?variable=valor
    //req.query.variable
    Task.find({})
        .skip(desde)
        .sort(order)
        .limit(limite) //limitar datos
        .exec((err, task) =>{
            if(err) {
                return res.status(400).json({
                    ok:false,
                    err
                })
            }

            res.json({
                ok:true,
                task
            })
        })
});

router.get('/taskid/:id' ,(req, res) => {
    let id = req.params.id;

    Task.find({"_id":id})
        .exec((err, task) =>{
            if(err) {
                return res.status(400).json({
                    ok:false,
                    err
                })
            }
            res.json({
                ok:true,
                task
            })
        })
});

router.get('/taskCom' ,(req, res) => {
    let id = req.params.id;

    Task.find({"status": true})
        .exec((err, task) =>{
            if(err) {
                return res.status(400).json({
                    ok:false,
                    err
                })
            }
            res.json({
                ok:true,
                task
            })
        })
});

router.get('/task/:name' ,(req, res) => {
    
    let name = req.params.name
    Task.find({$and:[{"name": name}, {"status": true }]})
        .exec((err, task) =>{
            if(err) {
                return res.status(400).json({
                    ok:false,
                    err
                })
            }

            res.json({
                ok:true,
                task
            })
        })
});

module.exports = router;