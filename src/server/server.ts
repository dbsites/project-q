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

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.listen(3000, () => console.log('Listening on 3000'));