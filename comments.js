// create web server
var http = require('http');
// parse url
var url = require('url');
// parse querystring
var querystring = require('querystring');
// file system module
var fs = require('fs');
var comments = [];

function send(res, data) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(data));
}

var server = http.createServer(function(req, res) {
    var parsedUrl = url.parse(req.url);
    var parsedQuery = querystring.parse(parsedUrl.query);
    var pathname = parsedUrl.pathname;
    if (pathname == '/addComment') {
        comments.push(parsedQuery);
        send(res, comments);
    } else if (pathname == '/getComments') {
        send(res, comments);
    } else {
        fs.readFile(__dirname + pathname, function(err, data) {
            if (err) {
                send(res, { message: 'Error' });
                return;
            }
            res.writeHead(200);
            res.end(data);
        });
    }
});

server.listen(3000, function() {
    console.log('Server is running at http://localhost:3000');
});