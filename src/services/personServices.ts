// Serviço de API para Pessoas
// Funções para interagir com o endpoint de Pessoas no backend

import { api } from "./api";

// Rota do backend para pessoas
const PERSON_ROUTE = "/Person";

// Busca todas as pessoas cadastradas
export function getAllPersons() {
  return api.get(PERSON_ROUTE);
}

// Busca uma pessoa específica pelo ID
export function getPersonById(id: number) {
  return api.get(`${PERSON_ROUTE}/${id}`);
}

// Cria uma nova pessoa
export function createPerson(data: any) {
  return api.post(PERSON_ROUTE, data);
}

// Atualiza uma pessoa existente
export function updatePerson(id: number, data: any) {
  return api.put(`${PERSON_ROUTE}/${id}`, data);
}

// Deleta uma pessoa
export function deletePerson(id: number) {
  return api.delete(`${PERSON_ROUTE}/${id}`);
}

// Busca o total de transações por pessoa
export function getTotalsPersons() {
  return api.get(`${PERSON_ROUTE}/totals`);
}