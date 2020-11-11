export interface MsgToKafkaFromFront {
  frontData: {
    card: string;
    expiration: string;
    cvv: string;
  };
  transactionId: string;
}

export interface DataSinkOutput {
  transactionId: string;
  token: string;
}
