import { cpus } from 'os';
import { Worker, isMainThread, workerData  } from 'worker_threads';
import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const coreNum = cpus().length;

export const performCalculations = async () => {
    const path = resolve(`${__dirname}/worker.js`);
    if(isMainThread) {
        for (let i = 10; i < coreNum + 10; i++) {
            const worker = new Worker(path, { workerData: { value: i } });
            worker.on('message', (result) => {
                console.log(`Worker ${worker.threadId} result on n = ${i}: ${result}`);
            });
        }
    }
};

performCalculations();
