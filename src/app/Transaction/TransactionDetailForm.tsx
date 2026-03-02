/**
 * TransactionDetailForm
 * 
 * Componente responsável por:
 * - Criar novas transações (receitas ou despesas)
 * - Selecionar categoria e pessoa associadas à transação
 * - Validar e enviar dados para o backend
 * 
 * Fluxo:
 * 1. Carrega todas as categorias e pessoas disponíveis ao montar
 * 2. Usuário preenche: descrição, valor, data, finalidade (tipo)
 * 3. Ao selecionar finalidade, filtra categorias e pessoas compatíveis
 * 4. Envia para API e redireciona para listagem
 */

import { useEffect, useState } from "react";
import { createTransaction } from "../../services/transactionServices";
import { getAllCategories } from "../../services/categoryServices";
import { getAllPersons } from "../../services/personServices";
import { useNavigate } from "react-router-dom";

// Define a estrutura de uma transação
type Transaction = {
  id: number;              // ID gerado pelo servidor
  description: string;     // Descrição da transação (ex: "Venda de produto")
  value: number;           // Valor em reais
  date: string;            // Data no formato YYYY-MM-DD
  categoriesId: number;    // ID da categoria selecionada
  personId: number;        // ID da pessoa envolvida
  type: string;            // "0" = Receita, "1" = Despesa
};

export default function TransactionDetailForm() {
  const navigate = useNavigate();                           // Hook para navegação entre páginas
  const [loading, setLoading] = useState(false);            // Controla estado de carregamento
  const [categories, setCategories] = useState<any[]>([]);  // Lista de categorias
  const [persons, setPersons] = useState<any[]>([]);        // Lista de pessoas
  
  // Estado da transação sendo preenchida
  const [transaction, setTransaction] = useState<Transaction>({
    id: 0,
    description: "",
    value: 0,
    date: "",
    categoriesId: 0,
    personId: 0,
    type: "0", // Padrão: Receita
  });

  /**
   * useEffect - Carrega dados iniciais
   * Executa uma única vez ao montar o componente
   * Busca categorias e pessoas da API em paralelo
   */
  useEffect(() => {
    async function loadData() {
      try {
        const [categoriesResponse, personsResponse] = await Promise.all([
          getAllCategories(),
          getAllPersons()
        ]);

        // Extrai dados da resposta (trata diferentes formatos de retorno)
        const categoriesData = Array.isArray(categoriesResponse.data) 
          ? categoriesResponse.data 
          : categoriesResponse.data.categories || categoriesResponse.data.data || [];
        
        const personsData = Array.isArray(personsResponse.data)
          ? personsResponse.data
          : personsResponse.data.persons || personsResponse.data.data || [];

        console.log("Categorias carregadas:", categoriesData);
        console.log("Pessoas carregadas:", personsData);

        setCategories(categoriesData);
        setPersons(personsData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    loadData();
  }, []); // Array vazio = executa apenas na montagem

  /**
   * handleSubmit - Processa o envio do formulário
   * 1. Previne comportamento padrão do formulário
   * 2. Converte dados para o formato esperado pelo backend
   * 3. Envia à API
   * 4. Redireciona ou exibe erro
   */
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Evita reload da página

    setLoading(true); // Desabilita botão e mostra "Salvando..."

    // Prepara dados para enviar (converte string para número)
    const payload = {
      description: transaction.description,
      value: transaction.value,
      date: transaction.date,
      categoriesId: transaction.categoriesId,
      personId: transaction.personId,
      type: parseInt(transaction.type, 10), // Converte "0" ou "1" para número
    };

    try {
      await createTransaction(payload);
      navigate("/transaction/search"); // Vai para listagem de transações
    } catch (error: any) {
      console.error("Erro na operação:", error);
      const responseData = error?.response?.data;
      const serverMessage =
        (typeof responseData === "string" ? responseData : null)
        || "Não foi possível salvar a transação.";
      // Exibe mensagem de erro ao usuário
    } finally {
      setLoading(false); // Re-habilita o botão
    }
  }

  return (
    <div className="container mt-4">
      <h1>Cadastrando Transação</h1>
      
      {/* Formulário principal */}
      <form onSubmit={handleSubmit} className="row g-3">
        
        {/* Campo: Código (somente leitura) */}
        <div className="col-md-2">
          <label className="form-label">Código</label>
          <input className="form-control" value={transaction.id} disabled />
        </div>

        {/* Campo: Descrição */}
        <div className="col-md-4">
          <label className="form-label">Descrição</label>
          <input
            type="text"
            className="form-control"
            value={transaction.description}
            onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
            required
          />
        </div>

        {/* Campo: Valor */}
        <div className="col-md-2">
          <label className="form-label">Valor</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={transaction.value}
            onChange={(e) => setTransaction({ ...transaction, value: parseFloat(e.target.value) })}
            required
          />
        </div>

        {/* Campo: Data */}
        <div className="col-md-2">
          <label className="form-label">Data</label>
          <input
            type="date"
            className="form-control"
            value={transaction.date}
            onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
            required
          />
        </div>

        {/* Campo: Finalidade (Receita/Despesa) */}
        <div className="col-md-3">
          <label className="form-label">Finalidade</label>
          <select
            className="form-control"
            value={transaction.type}
            onChange={(e) => setTransaction({ ...transaction, type: e.target.value })}
            required
          >
            <option value="">Selecione</option>
            <option value="0">Receita</option>
            <option value="1">Despesa</option>
          </select>
        </div>

        {/* Campo: Categoria (filtrada conforme finalidade) */}
        <div className="col-md-3">
          <label className="form-label">Categoria</label>
          <select
            className="form-control"
            value={transaction.categoriesId}
            onChange={(e) => setTransaction({ ...transaction, categoriesId: parseInt(e.target.value) })}
            required
          >
            <option value={0}>Selecione...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.description}
              </option>
            ))}
          </select>
        </div>

        {/* Campo: Pessoa (filtrada conforme finalidade) */}
        <div className="col-md-3">
          <label className="form-label">Pessoa</label>
          <select
            className="form-control"
            value={transaction.personId}
            onChange={(e) => setTransaction({ ...transaction, personId: parseInt(e.target.value) })}
            required
          >
            <option value={0}>Selecione...</option>
            {persons.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </div>

        {/* Botões: Salvar e Cancelar */}
        <div className="col-12 mt-3">
          <button type="submit" disabled={loading} className="btn btn-success">
            {loading ? "Salvando..." : "Salvar"}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}