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
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Credentials', 'true');
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
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req,res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/' + req.params.leaderId);
})
.put((req,res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    },{new:true}).then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.delete((req,res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err))
});

module.exports = leaderRouter;