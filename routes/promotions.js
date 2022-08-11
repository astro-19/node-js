const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

// router for promotions
promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send the promotions to you :)');
})
.post((req,res, next) => {
    res.end('Will add the promotion: ' + req.body.name +
    ' with details: ' + req.body.description);
})
.put((req,res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req,res, next) => {
    res.statusCode = 200;
    res.end('Deleting all the promotions :(');
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