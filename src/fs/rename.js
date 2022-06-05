import { stat, rename as rn } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isFileExist = async (path) => {
    try {
        const statistics = await stat(path);
        return !!statistics;
    } catch (e) {
        return false;
    }
}

export const rename = async () => {
    const directory = 'files';
    const originalFileName = 'wrongFilename.txt';
    const newFileName = 'properFilename.md';
    const originPath = resolve(`${__dirname}/${directory}/${originalFileName}`);
    const newPath = resolve(`${__dirname}/${directory}/${newFileName}`);

    const isOriginFileExist = await isFileExist(originPath);
    const isNewFileExist = await isFileExist(newPath);

    if (isNewFileExist || !isOriginFileExist) {
        throw Error('FS operation failed');
    } else {
        await rn(originPath, newPath);
    }
};

rename();
