import {access, mkdir, readdir, copyFile} from 'fs/promises';
import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isDirectoryExist = async (path) => {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
}

export const copy = async () => {
    try {
        const originalDirectoryName = 'files';
        const copyDirectoryName = 'files_copy';
        const pathToOriginDirectory = resolve(`${__dirname}/${originalDirectoryName}`);
        const pathToCopyDirectory = resolve(`${__dirname}/${copyDirectoryName}`);

        const isCopyExist = await isDirectoryExist(pathToCopyDirectory);
        const isOriginalExist = await isDirectoryExist(pathToOriginDirectory);


        if (!isOriginalExist) {
            throw Error('FS operation failed');
        } else if (!isCopyExist) {
            await mkdir(pathToCopyDirectory);
            const files = await readdir(pathToOriginDirectory);

            for (const file of files) {
                const fromPath = resolve(`${pathToOriginDirectory}/${file}`);
                const toPath = resolve(`${pathToCopyDirectory}/${file}`);
                await copyFile(`${fromPath}`, `${toPath}`);
            }
        } else {
            throw Error('FS operation failed');
        }
    } catch (e) {
        console.log(e);
    }
};

copy();
