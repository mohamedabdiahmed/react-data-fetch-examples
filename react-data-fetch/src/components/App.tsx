import React, { ChangeEvent, useRef } from 'react';
import testImage from '../assets/test-image.png'

export const App = () => {

    const inputFileRef = useRef<HTMLInputElement>(null);
    const onClickHandler = () => {
        console.log('test image', testImage);

        fetch('http://localhost:3001/file', {
            method: 'PUT',
            body: testImage,
            // redirect: 'follow',
        })
            .then((response) => response.json)
            .then((result) => console.log('RESULT', result))
            .catch((error) => console.log('error', error));
    }

    return (
        <div className="App">
           <button onClick={onClickHandler}>Send a file</button>
        </div>
    );
}

export default App;
