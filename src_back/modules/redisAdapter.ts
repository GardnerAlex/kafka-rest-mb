import * as Redis from 'ioredis';
// todo set types and errors processing
const appRoot = require('app-root-path');
require('dotenv').config({ path: `${appRoot}/.env` });

const redisOptions: Redis.NodeConfiguration = {
  host: process.env.REDIS_HOST,
  port: Number.parseInt(process.env.HOST_REDIS_PORT, 10)
};

// todo define TS types

export class RedisAdapter {
  redis: Redis.Redis;

  constructor(redisOptions: Redis.NodeConfiguration) {
    this.redis = new Redis(redisOptions);
  }

  set(input: { secret: string, transactionId: string }): Promise<void | string> {
    return this.redis.set(input.transactionId, input.secret)
      .then(res => res)// returns promise which resolves to string, "OK"
      .catch(e => console.log('REDIS SET ERROR', e));
  }

  get(key: string): Promise<string> {
    return this.redis.get(key).then((result) => result);
  }
}

export const redisAdapter = new RedisAdapter(redisOptions);

module.exports = {
  redisAdapter
};
