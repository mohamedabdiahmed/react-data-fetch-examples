import express from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
const upload = multer();

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

const cpUpload = upload.fields(
    [
        {name: 'someFile', maxCount: 1},
        {name: 'somePropName', maxCount: 1}
    ]
);

app.post('/form-file', cpUpload, (request, response) => {
    const {somePropName} = request.body;
    const files = request.files as { someFile: any };
    const file = files?.someFile[0] as File;

    response.send({
        headers: request.headers,
        somePropName,
        file
    });
})

app.post('/form-file-blob', cpUpload, (request, response) => {
    const {somePropName} = request.body;
    const files = request.files as { someFile: any };
    const file = files?.someFile[0] as File;

    response.send(file);
})

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`)
})
