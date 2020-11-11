import { Response, Request, NextFunction } from 'express';
import { BaseRoutesHandler } from '../handlers/baseRoutesHandler';

const appRoot = require('app-root-path');
require('dotenv').config({ path: `${appRoot}/.env` });

const dataSourceUrl = process.env.API_DATASOURCE_URL;

const routesHandler = new BaseRoutesHandler();

export const dataSource = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  //
  console.log('dataSource called');
  await routesHandler.dataSourceHandler(req, res, next);
};

export const routes: { endPoint: string; controller: (req: Request, res: Response, next: NextFunction) => Promise<void>; method: string }[] = [
  { method: 'post',
    endPoint: dataSourceUrl,
    controller: dataSource
  }
];
