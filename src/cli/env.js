export const parseEnv = () => {
    const env = { ...process.env };
    const keysArr = Object.keys(env);
    keysArr.forEach(key => {
       if (key.startsWith('RSS_')) {
           console.log(`${key}=${env[key]}`)
       }
    });
};

parseEnv();
