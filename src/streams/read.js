import { createReadStream } from 'fs';
import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const read = async () => {
    const path = resolve(`${__dirname}/files/fileToRead.txt`);
    const readeStream = createReadStream(path);
    const buffer = [];

    readeStream.on('data', (chunk) => {
        buffer.push(chunk);
    });

    readeStream.on('end', (chunk) => {
        console.log(buffer.toString());
    })
};

read();
