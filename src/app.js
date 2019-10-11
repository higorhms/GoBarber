import express from 'express';
import path from 'path';
import routes from './routes';
import './database';

/**
 * Class app used to configure routes, and middlewares in express..
 * also used in other classes to set the port of that the system is listening
 */
class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    /**
     * middlewares of system
     */
    middlewares() {
        this.server.use(express.json());
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
        );
    }

    /**
     * Routes of system
     */
    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
