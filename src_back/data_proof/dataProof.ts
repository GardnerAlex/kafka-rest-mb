import { KafkaStreamsAdapter } from '../modules/kafkaStreamsAdapter';
import { configKafka } from '../../config/config';
import { CryptoMod } from '../modules/cryptoMod';
import { DataSinkOutput } from '../backInterfaces';

const tokenizer = new CryptoMod('aes-256-ctr');
const kafkaAdapter = new KafkaStreamsAdapter(configKafka);
try {
  const deCipherStream = kafkaAdapter.getKafkaStream();
  deCipherStream
    .from(configKafka.outputTopic)
    .mapJSONConvenience()
    .mapWrapKafkaValue()
    .forEach((message: DataSinkOutput) => {
      tokenizer.decrypt(message)
        .then((res: string) => {
          console.log({ [message.transactionId]: JSON.parse(res) });
        })
        .catch((e) => console.log('Data Flow Output error', e));
    })
    .catch((e: Error) => console.log('deCipherStream read From Kafka error', e));
  deCipherStream.start().then(() => {
    console.log('Stream started');
  }, (error: Error) => {
    console.log(`Stream error: ${error}`);
  });
} catch (e) {
  console.log('dataProof error', e);
}
