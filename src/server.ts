import { App } from "./app";

const app = new App();
const server = app.listen();

server.on("error", onError);
server.on("listening", onListening);

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") throw error;
    const bind = (typeof app.port === "string") ? "Pipe " + app.port : "Port " + app.port;
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
}

function onListening(): void {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}