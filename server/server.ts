import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());

app.post('/binary-file', (request, response) => {
    let data = Buffer.from('');

    request.on('data', (chunk) => {
        data = Buffer.concat([data, chunk]);
    });
    request.on('end', () => {
        response.send({
            headers: request.headers,
            data
        });
    });
})

app.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`)
})
