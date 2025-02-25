//create web server
import express from 'express';
const { static: serveStatic } = express;
const app = express();
import { json } from 'body-parser';
import { readFile, writeFile } from 'fs';
import { join } from 'path';
const commentsPath = join(__dirname, 'comments.json');

app.use(json());
app.use(serveStatic('public'));

//get comments
app.get('/comments', (req, res) => {
    readFile(commentsPath, (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json');
            return;
        }
        res.send(data);
    });
});

//post comments
app.post('/comments', (req, res) => {
    readFile(commentsPath, (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json');
            return;
        }
        let comments = JSON.parse(data);
        comments.push(req.body);
        writeFile(commentsPath, JSON.stringify(comments), (err) => {
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


