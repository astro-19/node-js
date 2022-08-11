const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter')

const hostname = 'localhost';
const port = 3019;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes', dishRouter);
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    // console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is express server example.</h1></body></html>')

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})

















// const fs = require('fs');
// const path = require('path');


// const hostName = "localhost";
// const port = 3019;

// const server = http.createServer((req, res) => {
//     console.log("Request for " + req.url + " by method " + req.method);

//     if (req.method == 'GET') {
//         var fileURL;
//         if (req.url == '/') {
//             fileURL = "/index.html"
//         } else {
//             fileURL = req.url;
//         }

//         var filePath = path.resolve("./public" + fileURL);
//         const fileExt = path.extname(filePath);
//         if (fileExt == '.html') {
//             fs.exists(filePath, (exists) => {
//                 if (!exists) {
//                     res.statusCode = 404;
//                     res.setHeader('Content-Type', 'text/html');
//                     res.end('<html><body><h1>Error 404:' + fileURL + ' not found.</h1></body></html>');
//                     return;
//                 }
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'text/html');
//                 fs.createReadStream(filePath).pipe(res);
//             })
//         } else {
//             res.statusCode = 404;
//             res.setHeader('Content-Type', 'text/html');
//             res.end('<html><body><h1>Error 404:' + fileURL + ' not a HTML file.</h1></body></html>');
//             return;
//         }
//     } else {
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'text/html');
//         res.end('<html><body><h1>Error 404:' + req.method + ' not supported.</h1></body></html>');
//         return;
//     }
// })

// server.listen(port, hostName, () => {
//     console.log(`Server running http://${hostName}:${port}`)
// })
