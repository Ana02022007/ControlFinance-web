// Configuração do cliente HTTP
// Este arquivo cria uma instância do axios com a URL base pré-configurada
// Todos os serviços de API usarão esta instância

import axios from "axios";
import { baseUrl } from "../config/apiConfig";

// Cria instância do axios com URL base da API
export const api = axios.create({
  baseURL: baseUrl,
});