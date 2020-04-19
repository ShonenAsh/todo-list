const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Player } = require('../models/Player');

// => localhost:3000/Players/
router.get('/', (req, res) => {
    Player.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Players :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Player.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Player :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var ply = new Player({
        name: req.body.name,
        doj: req.body.doj,
        dob: req.body.dob,
        matches: req.body.matches,
    });
    ply.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Player Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var ply = {
        name: req.body.name,
        doj: req.body.doj,
        dob: req.body.dob,
        matches: req.body.matches,
    };
    Player.findByIdAndUpdate(req.params.id, { $set: ply }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Player Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Player.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Player Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;