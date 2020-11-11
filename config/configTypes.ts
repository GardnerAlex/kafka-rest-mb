export interface ConfigurationRedis {
  port: number;
  host: string;
}

export interface ConfigurationKafka {
  inputTopic: string;
  outputTopic: string;
  createTopics: string;
  streamsOptions: {
    noptions: {
      'metadata.broker.list': string;
      'group.id': string;
      'client.id': string;
      event_cb: boolean;
      'compression.codec': "none" | "gzip" | "snappy" | "lz4";
      'api.version.request': boolean;
      'socket.keepalive.enable': boolean;
      'socket.blocking.max.ms': number;
      'enable.auto.commit': boolean;
      'auto.commit.interval.ms': number;
      'heartbeat.interval.ms': number;
      'retry.backoff.ms': number;
      'fetch.min.bytes': number;
      'fetch.message.max.bytes': number;
      'queued.min.messages': number;
      'fetch.error.backoff.ms': number;
      'queued.max.messages.kbytes': number;
      'fetch.wait.max.ms': number;
      'queue.buffering.max.ms': number;
      'batch.num.messages': number;
    };
    tconf: {
      'auto.offset.reset': "smallest" | "earliest" | "beginning" | "largest" | "latest" | "end" | "error";
      'request.required.acks': number;
    },
    batchOptions: {
      batchSize: number;
      commitEveryNBatch: number;
      concurrency: number;
      commitSync: boolean;
      noBatchCommits: boolean;
    }
  };
}
