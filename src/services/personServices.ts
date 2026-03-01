import { api } from "./api";

const PERSON_ROUTE = "/api/person";

export function getAllPersons() {
  return api.get(PERSON_ROUTE);
}

export function getPersonById(id: number) {
  return api.get(`${PERSON_ROUTE}/${id}`);
}

export function createPerson(data: any) {
  return api.post(PERSON_ROUTE, data);
}

export function updatePerson(id: number, data: any) {
  return api.put(`${PERSON_ROUTE}/${id}`, data);
}

export function deletePerson(id: number) {
  return api.delete(`${PERSON_ROUTE}/${id}`);
}

export function getTotalsPersons() {
  return api.get(`${PERSON_ROUTE}/totals`);
}