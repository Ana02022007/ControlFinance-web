// Serviço de API para Categorias
// Funções para interagir com o endpoint de Categorias no backend

import { api } from "./api";

// Rota do backend para categorias
const CATEGORY_ROUTE = "/Category";

// Busca todas as categorias cadastradas
export function getAllCategories() {
  return api.get(CATEGORY_ROUTE);
}

// Busca uma categoria específica pelo ID
export function getCategoryById(id: number) {
  return api.get(`${CATEGORY_ROUTE}/${id}`);
}

// Cria uma nova categoria
export function createCategory(data: any) {
  return api.post(CATEGORY_ROUTE, data);
}

// Busca o total de transações por categoria
export function getTotalsCategories() {
  return api.get(`${CATEGORY_ROUTE}/totals`);
}