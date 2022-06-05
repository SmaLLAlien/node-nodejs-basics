import { Transform, pipeline } from 'stream';


export const transform = async () => {
    const readableStream = process.stdin;
    const writableStream = process.stdout;

    const reverseStream = new Transform({
        transform(chunk, encoding, callback) {
            const reversed = `${String(chunk).trim().split('').reverse().join('')}\n`;
            callback(null, reversed);
        }
    });

    pipeline(
        readableStream,
        reverseStream,
        writableStream,
        err => {
            console.log(err);
        }
    )
};

transform();
