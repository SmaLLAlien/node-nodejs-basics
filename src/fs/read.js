import { stat, readFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isFileExist = async (path) => {
    try {
        return await stat(path);
    } catch {
        return false;
    }
}

export const read = async () => {
    const directory = 'files';
    const fileName = 'fileToRead.txt';
    const path = resolve(`${__dirname}/${directory}/${fileName}`);

    if (await isFileExist(path)) {
        const data = await readFile(path, { encoding: 'utf-8' });
        console.log(data);
    } else {
        throw Error('FS operation failed');
    }
};

read();
