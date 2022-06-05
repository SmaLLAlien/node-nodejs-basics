import { createReadStream, createWriteStream } from 'fs';
import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';
import { stat } from 'fs/promises';
import * as zlib from 'zlib';
import { pipeline  } from 'stream';

const isFileExist = async (path) => {
    try {
        return await stat(path);
    } catch {
        return false;
    }
}

const __dirname = dirname(fileURLToPath(import.meta.url));

export const decompress = async () => {
    const pathRead = resolve(`${__dirname}/files/archive.gz`);
    const pathWrite = resolve(`${__dirname}/files/fileToCompress.txt`);
    const source = createReadStream(pathRead);
    const destination = createWriteStream(pathWrite);
    const unZip = zlib.createGunzip();

    if ( await isFileExist(pathRead)) {
        pipeline(source, unZip, destination, (err) => {
            if (err) {
                console.error('An error occurred:', err);
                process.exitCode = 1;
            }
        });
    } else {
        throw Error('FS operation failed');
    }
};

decompress();
