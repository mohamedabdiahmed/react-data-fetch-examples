import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import './App.css';

/**
 * Will be imported as Base64 format
 * You can check more about it here:
 * https://developer.mozilla.org/en-US/docs/Glossary/Base64
 */
import importedImage from '../assets/test-image.png'

export const App = () => {
    const [responseHeaders, setResponseHeaders] = useState();
    const [image, setImage] = useState<string>();
    const [selectedFile, setSelectedFile] = useState<File>();

    const onClickHandler = async () => {

        // -> 1. We need to convert imported image to blob
        const imageResponse = await fetch(importedImage)
        const blob = await imageResponse.blob();

        // -> 2. Upload blob-file to server
        const requestOptions = {
            method: 'POST',
            body: new Blob([blob]),
        };

        const response = await fetch('http://localhost:3001/binary-file', requestOptions);
        const {headers, data} = await response.json();

        setResponseHeaders(headers);

        // -> 3. Convert server response as ArrayBuffer to URL
        const Uint8Array = Buffer.from(data);
        const blobWithoutMIMEType = new Blob([Uint8Array]);
        const url = URL.createObjectURL(blobWithoutMIMEType)

        setImage(url);
    }

    const prettyJson = responseHeaders && JSON.stringify(responseHeaders, null, '\t');

    const onClickFormHandler = async () => {
        if(selectedFile){

            const formData = new FormData();
            formData.append("somePropName", 'somePropValue');
            formData.append("someFile", selectedFile);

            const requestOptions = {
                method: 'POST',
                body: formData,
            };

            const response = await fetch('http://localhost:3001/form-file', requestOptions);

            /*
              NOTE: "file" is not an instance of File - it is a simple object.
              If you will pass it to URL.createObjectURL(file) - it will fail.
             */
            const {somePropName, file, headers} = await response.json();

            setResponseHeaders({
                somePropName,
                ...headers,
            });

            const buffer = file.buffer;

            const Uint8Array =  Buffer.from(buffer);
            const url = URL.createObjectURL(new Blob([Uint8Array]));

            setImage(url);
        }
    };

    const handleInputOnChange = (event:ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    return (
        <div>
            <img src={image || importedImage}/>
            <button onClick={onClickHandler}>
                Send binary file
            </button>
            <button onClick={onClickFormHandler} disabled={!selectedFile}>
                Send form data
            </button>
            <input type="file" onChange={handleInputOnChange}/>
            <div>
                <h3>Response from server</h3>
                <pre>{prettyJson}</pre>
            </div>
        </div>
    );
}
