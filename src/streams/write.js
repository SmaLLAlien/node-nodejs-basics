import { createWriteStream } from 'fs';
import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const write = async () => {
    const path = resolve(`${__dirname}/files/fileToWrite.txt`);
    const writableStream = createWriteStream(path);
    const readableStream = process.stdin;

    readableStream.on('data', (chunk) => {
        writableStream.write(chunk);
    });
};

write();
