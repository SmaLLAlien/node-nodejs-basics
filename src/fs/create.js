import {stat, writeFile} from 'fs/promises';
import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isFileExist = async (path) => {
   try {
       return await stat(path);
   } catch {
       return false;
   }
}

export const create = async () => {
    const fileName = 'fresh.txt';
    const directory = 'files';
    const data = 'I am fresh and young';
    const path = resolve(`${__dirname}/${directory}/${fileName}`);
    const result = await isFileExist(path);

    if (result) {
        throw Error('FS operation failed');
    } else {
        await writeFile(path, data, { encoding: 'utf-8' });
    }
};

create();
