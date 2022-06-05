import {createHash} from 'crypto';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import {readFile} from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFileData = async () => {
    try {
        const dirName = 'files';
        const fileName = 'fileToCalculateHashFor.txt';
        const path = `${__dirname}/${dirName}/${fileName}`;
        return await readFile(path, 'utf-8');
    } catch (e) {
        console.log(e);
        return '';
    }
}

export const calculateHash = async () => {
    const fileData = await getFileData();
    return createHash('sha256').update(fileData).digest('hex');
};

console.log(await calculateHash());
