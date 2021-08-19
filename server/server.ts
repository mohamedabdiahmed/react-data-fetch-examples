import express from 'express';

const app = express();
const PORT = 3001;

app.post('/file', (request, response) => {
    let data = new Buffer('');
    request.on('data', (chunk) => {
        data = Buffer.concat([data, chunk]);
    });
    request.on('end', () => {
        response.send(data);
    });
})

app.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`)
})
