/**
 * ************************************
 *
 * @module  redis.ts
 * @description Module which connects to the redis server
 *
 * ************************************
 */

import * as redis from 'redis';
import * as dotenv from 'dotenv';
dotenv.config();

// Extract client configuration from .env
const host: string = process.env.REDIS_URI as string;
const port: number = Number(process.env.REDIS_PORT as string);
const password: string = process.env.REDIS_PASS as string;

// Connect to Redis Client
const redisClient = redis.createClient({
  host,
  port,
  password,
});

// Log Successful Connection or Error
redisClient.on('ready', () => console.log('Connected To Redis Data Store'));
redisClient.on('error', err => {console.error('Redis Error: ', err)});

export default redisClient;
