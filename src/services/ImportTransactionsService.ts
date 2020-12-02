import csvtojson from 'csvtojson';
import fs from 'fs';
import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

async function createTransaction({
  title,
  value,
  type,
  category,
}: Request): Promise<Transaction> {
  const createTransactionService = new CreateTransactionService();
  const transaction = await createTransactionService.execute({
    title,
    value,
    type,
    category,
  });
  return transaction;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const transactions: Array<Request> = await csvtojson().fromFile(filePath);
    fs.unlink(filePath, err => {
      if (err) {
        console.error(err);
      }
    });
    const newTransactions = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const transaction of transactions) {
      // eslint-disable-next-line no-await-in-loop
      newTransactions.push(await createTransaction(transaction));
    }

    return newTransactions;
  }
}

export default ImportTransactionsService;
