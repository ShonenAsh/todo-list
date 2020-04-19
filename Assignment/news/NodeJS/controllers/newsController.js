const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { News } = require('../models/News');

// => localhost:3000/News/
router.get('/', (req, res) => {
    News.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving  :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    News.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving News :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var news = new News({
        name: req.body.name,
        date: req.body.date,
        category: req.body.category,
        place: req.body.place,
    });
    news.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in News Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var news = {
        name: req.body.name,
        date: req.body.date,
        category: req.body.category,
        place: req.body.place,
    };
    News.findByIdAndUpdate(req.params.id, { $set: news }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in News Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    News.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in News Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;