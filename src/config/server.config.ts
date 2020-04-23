const env: string = process.env.NODE_ENV;
const port: number = parseInt(process.env.PORT);

export const serverConfig = { env, port };
