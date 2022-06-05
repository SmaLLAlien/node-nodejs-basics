export const parseArgs = () => {
    const myArgs = process.argv.slice(2);

    if (myArgs.length % 2)
        throw new Error('Number of arguments is not valid');

    for (let i = 0; i < myArgs.length; i+=2) {
        const argKey = myArgs[i];
        const value = myArgs[i + 1];

        const key = argKey.replace(/^--/, '');
        console.log(`${key} is ${value}`);
    }
};

parseArgs();
