const express = require('express');
const bodyParser = require('body-parser');
const Leaders = require('../models/leaders');
const mongoose = require('mongoose');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

// router for leaders
leaderRouter.route('/')
.get((req, res, next) => {
    Leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req,res, next) => {
    Leaders.create(req.body)
    .then((leader) => {
        console.log('Leader created: ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req,res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req,res, next) => {
    Leaders.remove({})
    .then((leader) => {
        console.log('Deleted leader: ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err))
});

// router with leader Id
leaderRouter.route('/:leaderId')
.get((req, res, next) => {
    res.end('Will send the details of leader: ' + req.params.leaderId +
    ' to you :)');
})
.post((req,res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on ' + req.params.leaderId);
})
.put((req,res, next) => {
    res.write('Updating the leader: ' + req.params.leaderId);
    res.end(' Will update the leader: ' + req.body.name +
    ' with details: ' + req.body.description);
})
.delete((req,res, next) => {
    res.statusCode = 200;
    res.end('Deleting all the leader: ' + req.params.leaderId);
});

module.exports = leaderRouter;