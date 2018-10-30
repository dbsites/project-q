/**
 * ************************************
 *
 * @module  Server.ts
 * @author Team Quail
 * @date
 * @description 
 *
 * ************************************
 */

import * as express from 'express';
import { Application, Request, Response } from 'express';
const path = require('path');

const app: Application = express();

const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.post('/login', (_: Request, res: Response) => {
  console.log("Hitting User Login End Point");
  res.end();
});

app.post('/register', (_: Request, res: Response) => {
  console.log('Hitting User Registration Routes');
  res.end();
});

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));

