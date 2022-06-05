import { createReadStream, createWriteStream } from 'fs';
import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';
import * as zlib from 'zlib';
import { pipeline  } from 'stream';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const compress = async () => {
    const pathRead = resolve(`${__dirname}/files/fileToCompress.txt`);
    const pathWrite = resolve(`${__dirname}/files/archive.gz`);
    const source = createReadStream(pathRead);
    const destination = createWriteStream(pathWrite);
    const zip = zlib.createGzip();

    pipeline(source, zip, destination, (err) => {
        if (err) {
            console.error('An error occurred:', err);
            process.exitCode = 1;
        }
    });
};

compress();
