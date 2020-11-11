import { configKafka } from '../../config/config';
import { CryptoMod } from '../modules/cryptoMod';
import { KafkaStreamsAdapter } from '../modules/kafkaStreamsAdapter';

const appRoot = require('app-root-path');
require('dotenv').config({ path: `${appRoot}/.env` });

const tokenizer = new CryptoMod('aes-256-ctr');
const kafkaAdapter = new KafkaStreamsAdapter(configKafka);

const startStreams = () => {
  try {
    const cipherStream = kafkaAdapter.getKafkaStream();
    cipherStream
      .from(configKafka.inputTopic)
      .mapJSONConvenience()
      .mapWrapKafkaValue()
      .asyncMap(tokenizer.encrypt.bind(tokenizer))
      .tap((msg: string) => {
        console.log('CIPHERED', msg);
      })
      .wrapAsKafkaValue()
      .to(configKafka.outputTopic, 1)
      .catch((e: Error) => console.log(e));
    cipherStream.start().then(() => {
      console.log('Stream started');
    }, (error: Error) => {
      console.log(`Stream error: ${error}`);
    });
  } catch (e) {
    console.log('startStreams error', e);
  }
};

startStreams();
