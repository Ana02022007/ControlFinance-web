import { api } from "./api";

const CATEGORY_ROUTE = "/api/category";

export function getAllCategories() {
  return api.get(CATEGORY_ROUTE);
}

export function getCategoryById(id: number) {
  return api.get(`${CATEGORY_ROUTE}/${id}`);
}

export function createCategory(data: any) {
  return api.post(CATEGORY_ROUTE, data);
}

export function getTotalsCategories() {
  return api.get(`${CATEGORY_ROUTE}/totals`);
}