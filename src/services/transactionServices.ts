import { api } from "./api";

const TRANSACTION_ROUTE = "/Transaction";

export function getAllTransactions() {
  return api.get(TRANSACTION_ROUTE);
}

export function getTransactionById(id: number) {
  return api.get(`${TRANSACTION_ROUTE}/${id}`);
}

export function createTransaction(data: any) {
  return api.post(TRANSACTION_ROUTE, data);
}

export function updateTransaction(id: number, data: any) {
  return api.put(`${TRANSACTION_ROUTE}/${id}`, data);
}

export function deleteTransaction(id: number) {
  return api.delete(`${TRANSACTION_ROUTE}/${id}`);
}

export function getTotalsTransactions() {
  return api.get(`${TRANSACTION_ROUTE}/totals`);
}