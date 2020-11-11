export interface PerformTransactionRequest {
  card: string;
  expirationDate: string;
  cvv: string;
  transactionId?: string;
}

export interface PerformTransactionResponse {
  data: {
    result: {
      success: boolean;
      transactionId: string;
    };
    error?: {
      code: number;
      description: string;
    };}
}
