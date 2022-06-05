import { cpus } from 'os';
import { Worker, isMainThread, workerData  } from 'worker_threads';
import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const coreNum = cpus().length;
const workerPromisesArr = [];

export const performCalculations = async () => {
    const path = resolve(`${__dirname}/worker.js`);
    if(isMainThread) {
        for (let i = 10; i < coreNum + 10; i++) {
            const worker = new Worker(path, { workerData: { value: i } });
            const promise = new Promise((resolve, reject) => {
                worker.on('message', resolve);
                worker.on('error', reject);
            })

            workerPromisesArr.push(promise);
        }

        let fiboResults = await Promise.allSettled(workerPromisesArr);
        return fiboResults.map(result => {
            if (result.status === 'fulfilled') {
                return { status: 'resolved', data: result.value }
            } else {
                return { status: 'error', data: null }
            }
        });
    }
};

const res = await performCalculations();
console.log(res);
