import 'dotenv/config';

import express from 'express';
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';
import 'express-async-errors';
import './database';
import routes from './routes';

/**
 * Class app used to configure routes, and middlewares in express..
 * also used in other classes to set the port of that the system is listening
 */
class App {
    constructor() {
        this.server = express();

        Sentry.init(sentryConfig);

        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }

    /**
     * middlewares of system
     */
    middlewares() {
        this.server.use(Sentry.Handlers.requestHandler());
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
        this.server.use(Sentry.Handlers.errorHandler());
    }

    exceptionHandler() {
        this.server.use(async (err, req, res, next) => {
            if (process.env.NODE_ENV === 'development') {
                const errors = await new Youch(err, req).toJSON();

                return res.status(500).json(errors);
            }
            return res.status(500).json({ error: 'internal server error' });
        });
    }
}

export default new App().server;
