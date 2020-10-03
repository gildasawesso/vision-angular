import {TransactionType} from './transaction-type';

export class Transaction {
  '_id'?: string;
  name: string;
  operation: string;
  amount: number;
  date?: Date;
  transactionDate: Date;
  transactionTypeId: string;
  schoolId: string;
  schoolYearId: string;
  transactionType?: TransactionType;
}
