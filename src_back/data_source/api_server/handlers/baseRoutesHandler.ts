import { Request, Response, NextFunction } from 'express';
import { v4 } from 'uuid';
import { KafkaStreamsAdapter } from '../../../modules/kafkaStreamsAdapter';
import { configKafka } from '../../../../config/config';
import { MsgToKafkaFromFront } from '../../../backInterfaces';

const kafkaAdapter = new KafkaStreamsAdapter(configKafka);
kafkaAdapter.startProducer(configKafka.inputTopic);

export class BaseRoutesHandler {
  // eslint-disable-next-line class-methods-use-this
  async dataSourceHandler(request: Request, response: Response, nextStep: NextFunction): Promise<void> {
    const transactionId = v4();
    const bodyToFront = {
      result: { success: true, transactionId },
      error: {
        code: 0,
        description: ''
      }
    };
    const messageToKafka: MsgToKafkaFromFront = {
      frontData: { ...request.body },
      transactionId
    };
    kafkaAdapter.sendToKafka()
      .writeToStream(JSON.stringify(messageToKafka));
    response.status(200).send(bodyToFront);
    nextStep();
  }
}
