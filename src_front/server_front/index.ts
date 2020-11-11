import { Request, Response } from 'express';

const appRoot = require('app-root-path');
require('dotenv').config({ path: `${appRoot}/.env` });

const port = process.env.WWW_PORT;
const path = require('path');
const express = require('express');

const app = express(); // create express app

// app.use(express.static(path.join(__dirname, '../../build')));
app.use(express.static(path.join(`${appRoot}/build/front`)));

app.use((req: Request, res: Response) => {
  // res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  res.sendFile(path.join(`${appRoot}/build/front`, 'index.html'));
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
