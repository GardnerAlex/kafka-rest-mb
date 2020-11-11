import { Request, Response, NextFunction, Errback } from 'express';

import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import { routes } from './api_server/controllers';

const bodyParser = require('body-parser');

const appRoot = require('app-root-path');
require('dotenv').config({ path: `${appRoot}/.env` });
const util = require('util');

const appPort = process.env.API_REST_PORT;
const baseUrl = process.env.API_BASE_URL;

class AppServer {
  routes: Array<Object>;

  restPort: string;

  baseUrl: string;

  app: express.Application;

  constructor(
    routesArray: Array<Object>,
    restPort: string,
    baseUrl: string
  ) {
    this.app = express();
    this.routes = routesArray;
    this.baseUrl = baseUrl;
    this.restPort = restPort;
    this.app.set('port', restPort);
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.registerRoutes();
  }

  registerRoutes(): void {
    try {
      this.app.use((req: Request, res: Response, next: NextFunction) => {
        next();
      });
      this.app.use((req, res, next) => {
        req.connection.on('close', () => {
          // code to handle connection abort
        });
        next();
      });
      // handle errors
      this.app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
        console.log('request error:', JSON.stringify(util.inspect(req)), err);
        res.status(500);
        res.send({ error: 'Error occurred' });
        next();
      });
      this.routes.forEach((route): void => {
        // @ts-ignore --- fix later
        this.app[route.method](`${this.baseUrl}${route.endPoint}`, route.controller);
      });
    } catch (e) {
      console.log('registerRoutes Error', e);
    }
  }

  start(): void {
    try {
      this.app.listen(this.restPort, () => {
        console.log(`server is running on port ${this.restPort}`);
      });
    } catch (e) {
      console.log('server start Error', e);
    }
  }
}

const app = new AppServer(routes, appPort, baseUrl);
if (require.main === module) {
  app.start();
}
