import { access, readdir } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isDirectoryExist = async (path) => {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
}

export const list = async () => {
    const path = resolve(`${__dirname}/files`);
    const isFolderExist = await isDirectoryExist(path);

    if (isFolderExist) {
        const files = await readdir(path);
        console.log(files);
    } else {
        throw Error('FS operation failed');
    }
};

list();
