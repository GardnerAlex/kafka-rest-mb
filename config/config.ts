import { ConfigurationKafka, ConfigurationRedis } from './configTypes';

const appRoot = require('app-root-path');
require('dotenv').config({ path: `${appRoot}/.env` });

export const configRedis: ConfigurationRedis = {
  port: 6380,
  host: '127.0.0.1'
};

export const configKafka: ConfigurationKafka = {
  inputTopic: 'data-input',
  outputTopic: 'data-output',
  createTopics: 'data-input:1:1,data-output:1:1',
  streamsOptions: {
    noptions: {
      'metadata.broker.list': `${process.env.KAFKA_HOST}:${process.env.HOST_KAFKA_PORT}`,
      'group.id': 'kafka-streams-test-native',
      'client.id': 'kafka-streams-test-name-native',
      event_cb: true,
      'compression.codec': 'snappy',
      'api.version.request': true,
      'socket.keepalive.enable': true,
      'socket.blocking.max.ms': 100,
      'enable.auto.commit': false,
      'auto.commit.interval.ms': 100,
      'heartbeat.interval.ms': 250,
      'retry.backoff.ms': 250,
      'fetch.min.bytes': 100,
      'fetch.message.max.bytes': 2 * 1024 * 1024,
      'queued.min.messages': 100,
      'fetch.error.backoff.ms': 100,
      'queued.max.messages.kbytes': 50,
      'fetch.wait.max.ms': 1000,
      'queue.buffering.max.ms': 1000,
      'batch.num.messages': 10000
    },
    tconf: {
      'auto.offset.reset': 'earliest',
      'request.required.acks': 1
    },
    batchOptions: {
      batchSize: 5,
      commitEveryNBatch: 1,
      concurrency: 1,
      commitSync: false,
      noBatchCommits: false
    }
  }
};
