/**
 * ************************************
 *
 * @module  daemonServer.ts
 * @author Team Quail
 * @date 
 * @description Node Express Server to continously hit finance API on an interval
 *
 * ************************************
 */

  // import express server api
import * as express from 'express';
// import express types for .ts functionality
import { Application, Request, Response } from 'express';
// import body-parser for getting req.body from front end posts
import * as bodyParser from 'body-parser';
// import cors to enable cross-origin sharing between dev server and server
import * as cors from 'cors';
// import helmet to increase app security
import * as helmet from 'helmet';
// import questionDb middleware
// import DatabaseMethods from './middleware/additionalDataMethods';


// activate the express server
const app: Application = express();

// define listening port
const PORT = 6000;

// Allow CORS, credentials true expects  request to come with credentials and origin specifies where they should come from
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));

//  protects from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());

// tell express to use bodyparser to parse json files in req.body
app.use(bodyParser.json({limit: '10mb'}));

app.get('/', (_: Request, res: Response) => {
  res.send('listening');
})



// wake up the server
app.listen(PORT, () => console.log(`Daemon listening on PORT: ${PORT}`));