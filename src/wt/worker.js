import {parentPort, workerData} from "worker_threads";
// n should be received from main thread
export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
    const n = workerData.value;
    return nthFibonacci(n);
};

parentPort.postMessage(sendResult());
