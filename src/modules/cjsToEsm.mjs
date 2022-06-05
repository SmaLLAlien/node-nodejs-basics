import { sep } from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    const {default: moduleA} = await import('./files/a.json', { assert: { type: 'json' } });
    unknownObject = moduleA;
} else {
    const {default: moduleB} = await import('./files/b.json', { assert: { type: 'json' } });
    unknownObject = moduleB;
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const createMyServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

export { unknownObject, createMyServer };
