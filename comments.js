// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const qs = require('querystring');
const comments = require('./comments.json');

//Create web server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const parsedQuery = qs.parse(parsedUrl.query);
    const resourseName = path.basename(parsedUrl.pathname);

    if (resourseName === 'comments' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(comments));
    } else if (resourseName === 'comments' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const bodyParsed = qs.parse(body);
            comments.push({name: bodyParsed.name, comment: bodyParsed.comment});
            fs.writeFile('./comments.json', JSON.stringify(comments), 'utf8', (err) => {
                if (err) {
                    res.end('Error');
                } else {
                    res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'});
                    res.end('Success');
                }
            });
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});