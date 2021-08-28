import React, { useState } from 'react';
import './App.css';

/**
 * Will be imported as Base64 format
 * You can check more about it here: https://developer.mozilla.org/en-US/docs/Glossary/Base64
 */
import importedImage from '../assets/test-image.png'

export const App = () => {
    const [response, setResponse] = useState();
    const [image, setImage] = useState<string>();

    const convertArrayBufferToUrl = (arrayBuffer: ArrayBuffer): string => {
        const Uint8Array = Buffer.from(arrayBuffer);
        const blob = new Blob([Uint8Array]);
        return URL.createObjectURL(blob)
    }

    const handleFetch = async (blob: Blob) => {
        fetch('http://localhost:3001/file', {
            method: 'POST',
            body: blob,
            headers: {}
        })
            .then((response) => response.json())
            .then(({headers, data}) => {
                setResponse(headers);



                /*
                Data will be returned as ArrayBuffer
                {
                 type: "Buffer",
                 data: Array(117)
                }
                 */
                setImage(convertArrayBufferToUrl(data));
            })
            .catch((error) => console.log('error', error));
    }

    const convertBase64toBlob = async (callback: (blob: Blob) => void) => {
        const response = await fetch(importedImage)
        response
            .blob()
            .then((blob) => {
                callback(blob);
            })
    }

    const onClickHandler = () => {
        convertBase64toBlob(handleFetch);
    }

    const prettyJson = response && JSON.stringify(response, null, '\t');

    return (
        <div>
            <img src={image}/>
            <button onClick={onClickHandler}>
                Send a file
            </button>
            <div>
                <h3>Response from server</h3>
                <pre>{prettyJson}</pre>
            </div>
        </div>
    );
}
