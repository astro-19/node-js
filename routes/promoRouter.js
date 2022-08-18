const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promos = require('../models/promos');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

// router for promotions
promoRouter.route('/')
.get((req, res, next) => {
    Promos.find({}).then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req,res, next) => {
    Promos.create(req.body)
    .then((promo) => {
        console.log('Promo created: ', promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req,res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req,res, next) => {
    Promos.remove({}).then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err))
});

// router with promotion id
promoRouter.route('/:promoId')
.get((req, res, next) => {
    res.end('Will send the details of promotion: ' + req.params.promoId +
    ' to you :)');
})
.post((req,res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on ' + req.params.promoId);
})
.put((req,res, next) => {
    res.write('Updating the promotion: ' + req.params.promoId);
    res.end(' Will update the promotion: ' + req.body.name +
    ' with details: ' + req.body.description);
})
.delete((req,res, next) => {
    res.statusCode = 200;
    res.end('Deleting all the promotion: ' + req.params.promoId);
});

module.exports = promoRouter;