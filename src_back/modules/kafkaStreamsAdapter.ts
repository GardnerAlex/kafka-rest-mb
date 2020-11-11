import * as kafkaStreamsForTyping from 'kafka-streams';
import { KafkaStreams } from 'kafka-streams';
import { ConfigurationKafka } from '../../config/configTypes';

export class KafkaStreamsAdapter {
  kafkaStreams: any;

  producer: kafkaStreamsForTyping.KStream;

  constructor(streamsConfig: ConfigurationKafka) {
    this.kafkaStreams = new KafkaStreams(streamsConfig.streamsOptions);
    this.kafkaStreams.on('error', (error: any) => console.error(error));
    this.producer = this.kafkaStreams.getKStream(null);
  }

  startProducer(topic: string) {
    this.producer.to(topic);
    this.producer.start().then(() => {
      console.log('Producer is ready.');
    }, error => {
      console.log(`Producer failed to start: ${error}`);
    });
  }

  sendToKafka() {
    return this.producer;
  }

  getKafkaStream(topic: string = null) {
    return this.kafkaStreams.getKStream(topic);
  }
}
