import { api } from "./api";

const TRANSACTION_ROUTE = "/api/transaction";

export function getAllTransactions() {
  return api.get(TRANSACTION_ROUTE);
}

export function getTransactionById(id: number) {
  return api.get(`${TRANSACTION_ROUTE}/${id}`);
}

export function createTransaction(data: any) {
  return api.post(TRANSACTION_ROUTE, data);
}