import { stat, unlink } from 'fs/promises';
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

export const remove = async () => {
    try {
        const directory = 'files';
        const fileName = 'fileToRemove.txt';
        const path = resolve(`${__dirname}/${directory}/${fileName}`);

        const isExist = await isFileExist(path);

        if (isExist) {
            await unlink(path);
        } else {
            throw Error('FS operation failed');
        }
    } catch (e) {
        console.log(e);
    }
};

remove();
