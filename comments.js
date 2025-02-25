//create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');

app.use(bodyParser.json());
app.use(express.static('public'));

//get comments
app.get('/comments', (req, res) => {
    fs.readFile(commentsPath, (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json');
            return;
        }
        res.send(data);
    });
});

//post comments
app.post('/comments', (req, res) => {
    fs.readFile(commentsPath, (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json');
            return;
        }
        let comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Error writing comments.json');
                return;
            }
            res.send('Comment added');
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}
);


