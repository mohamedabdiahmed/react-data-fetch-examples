/**
 * Base 64 to the Blob
 * @param b64Data
 * @param contentType
 * @param sliceSize
 * @returns {Blob}
 */
export const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
}


// FROM HERE:

// convert a Unicode string to a string in which
// each 16-bit unit occupies only one byte
export function toBinary(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
        codeUnits[i] = string.charCodeAt(i);
    }
    return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
}

// a string that contains characters occupying > 1 byte
let encoded = toBinary("✓ à la mode") // "EycgAOAAIABsAGEAIABtAG8AZABlAA=="
