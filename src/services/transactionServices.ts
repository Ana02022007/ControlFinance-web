// Serviço de API para Transações
// Funções para interagir com o endpoint de Transações no backend

import { api } from "./api";

// Rota do backend para transações
const TRANSACTION_ROUTE = "/Transaction";

// Busca todas as transações cadastradas
export function getAllTransactions() {
  return api.get(TRANSACTION_ROUTE);
}

// Busca uma transação específica pelo ID
export function getTransactionById(id: number) {
  return api.get(`${TRANSACTION_ROUTE}/${id}`);
}

// Cria uma nova transação
export function createTransaction(data: any) {
  return api.post(TRANSACTION_ROUTE, data);
}

// Atualiza uma transação existente
export function updateTransaction(id: number, data: any) {
  return api.put(`${TRANSACTION_ROUTE}/${id}`, data);
}

// Deleta uma transação
export function deleteTransaction(id: number) {
  return api.delete(`${TRANSACTION_ROUTE}/${id}`);
}

// Busca o total de transações
export function getTotalsTransactions() {
  return api.get(`${TRANSACTION_ROUTE}/totals`);
}