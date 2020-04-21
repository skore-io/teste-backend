import * as express from "express";
import * as bodyParser from "body-parser";
import { Server, createServer } from "http";
import Router from "./routes/Router";
import * as dotenv from 'dotenv';
dotenv.config({ path: ".env" })

export class App {

    private app: express.Application;
    private port: string | number;
    private server: Server;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.middleware();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private async listen() {
        try {
            this.server.listen(process.env.PORT, () => {
                console.log('Running server on port %s', this.port);

            })
        } catch (e) {
            console.log("ERROR:" + e)
        }
    }

    private config(): void {
        this.port = process.env.PORT;
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }
    private middleware(): void {

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }))

        new Router()
            .startWith(this.app)

    }

    public getApp(): express.Application {
        return this.app
    }
}