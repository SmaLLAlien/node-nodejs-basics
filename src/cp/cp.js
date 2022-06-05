import { spawn } from 'child_process';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { Transform } from 'stream';


const __dirname = dirname(fileURLToPath(import.meta.url));

const transformChildResponse = new Transform({
    transform(chunk, encoding, callback) {
        const newString = `Received from child process: ${String(chunk).trim()}\n`;
        callback(null, newString);
    }
});

export const spawnChildProcess = async (args) => {
    const path = resolve(`${__dirname}/files/script.js`);
    const child = spawn('node', [path, args]);

    process.stdin.pipe(child.stdin);

    child.stdout.pipe(transformChildResponse).pipe(process.stdout)
};

spawnChildProcess(process.argv.slice(2));
