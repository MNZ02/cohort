import express from 'express';
import fs from 'fs';
const app = express();

const dirPath = './files'

app.get('/', (req, res) => {
    res.send('Simple File server');
})

app.get('/files', (req, res) => {
    fs.readdir(dirPath, (err, files) => {
        if(err) {
            console.error('Error reading directory', err);
            return;
        }

        res.status(200).json(files)
    })
})

app.get('/files/:filename', (req,res) => {
    const {filename} = req.params;
    console.log(req.params)

    const filePath = `${dirPath}/${filename}`
    fs.readFile(filePath, 'utf-8', (err,data) => {
        if(err) {
            console.error('Error reading file', err);
            return;
        }
        res.send(data);
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
})