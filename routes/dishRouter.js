const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// router for dishes
dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send the dishes to you :)');
})
.post((req,res, next) => {
    res.end('Will add the dish: ' + req.body.name +
    ' with details: ' + req.body.description);
})
.put((req,res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req,res, next) => {
    res.statusCode = 200;
    res.end('Deleting all the dishes :(');
});

// router with dish Id
dishRouter.route('/:dishId')
.get((req, res, next) => {
    res.end('Will send the details of dish: ' + req.params.dishId +
    ' to you :)');
})
.post((req,res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on ' + req.params.dishId);
})
.put((req,res, next) => {
    res.write('Updating the dish: ' + req.params.dishId);
    res.end(' Will update the dish: ' + req.body.name +
    ' with details: ' + req.body.description);
})
.delete((req,res, next) => {
    res.statusCode = 200;
    res.end('Deleting all the dish: ' + req.params.dishId);
});

module.exports = dishRouter;