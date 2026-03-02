/**
 * TransactionSearchForm
 * 
 * Componente responsável por:
 * - Listar todas as transações registradas no sistema
 * - Exibir informações de cada transação (descrição, valor, data, categoria, pessoa)
 * - Navegação para criar nova transação
 * - Tratamento de estado de carregamento
 * 
 * Fluxo:
 * 1. Ao montar o componente, busca todas as transações da API
 * 2. Exibe mensagem de carregamento enquanto aguarda resposta
 * 3. Renderiza tabela com as transações ou mensagem se vazia
 */

import { useEffect, useState } from "react";
import { getAllTransactions } from "../../services/transactionServices";
import { Link } from "react-router-dom";

/**
 * Type Transaction
 * Define a estrutura de uma transação exibida na listagem
 */
type Transaction = {
  id: number;              // ID único da transação
  description: string;     // Descrição/motivo da transação
  value: number;           // Valor em reais (ex: 150.50)
  date: string;            // Data da transação (formato: YYYY-MM-DD)
  categoriesId: number;    // ID da categoria (referência)
  personId: number;        // ID da pessoa (referência)
  categoryName?: string;   // Nome da categoria (vem do Mapper C#)
  personName?: string;     // Nome da pessoa (vem do Mapper C#)
};

export default function TransactionSearchForm() {
  // Estado: Lista de transações carregadas da API
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Estado: Indica se está carregando dados da API
  const [loading, setLoading] = useState(false);

  /**
   * useEffect - Carrega transações ao montar o componente
   * Executa uma única vez (array de dependências vazio)
   * 
   * Processo:
   * 1. Ativa loading (mostra mensagem "Carregando...")
   * 2. Chama serviço getAllTransactions()
   * 3. Extrai dados da resposta (trata diferentes formatos)
   * 4. Valida se é array antes de armazenar
   * 5. Captura erros e exibe no console
   * 6. Desativa loading ao terminar
   */
  useEffect(() => {
    setLoading(true);
    
    getAllTransactions()
      .then((response) => {
        // Trata resposta: pode vir como response.data.transactions ou response.data direto
        const data = response.data.transactions || response.data;
        // Valida se é array, se não for usa array vazio
        setTransactions(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        // Log do erro para debug
        console.error("Erro ao buscar transações:", error);
      })
      .finally(() => {
        // Sempre desativa loading, mesmo com erro
        setLoading(false);
      });
  }, []); // Array vazio = executa apenas na montagem

  /**
   * Renderização - Estado de carregamento
   * Mostra mensagem enquanto busca dados da API
   */
  if (loading) return <div><p>Carregando...</p></div>;

  return (
    <div className="container mt-4">
      {/* Título da página */}
      <h2>Transações</h2>
      
      {/* Botões de navegação */}
      <div className="d-flex align-items-center gap-2 mb-3">
        {/* Botão: Voltar para página anterior */}
        <Link to="/">
          <button className="btn btn-secondary">Voltar</button>
        </Link>
        {/* Botão: Ir para formulário de criar transação */}
        <Link to="/transaction/create">
          <button className="btn btn-primary">Criar Transação</button>
        </Link>
      </div>

      {/* Renderização condicional: Se não há transações */}
      {transactions.length === 0 ? (
        <div className="alert alert-info">Nenhuma transação encontrada.</div>
      ) : (
        /* Tabela com as transações */
        <div className="table-responsive">
          <table className="table table-hover border">
            {/* Cabeçalho da tabela */}
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Categoria</th>
                <th>Pessoa Associada</th>
              </tr>
            </thead>
            
            {/* Corpo da tabela - Mapeia cada transação para uma linha */}
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  {/* Coluna: ID */}
                  <td>{transaction.id}</td>
                  
                  {/* Coluna: Descrição */}
                  <td>{transaction.description}</td>
                  
                  {/* Coluna: Valor (formatado em BRL com 2 casas decimais) */}
                  <td>R$ {transaction.value.toFixed(2)}</td>
                  
                  {/* Coluna: Data (convertida para formato local: DD/MM/YYYY) */}
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  
                  {/* Coluna: Nome da Categoria (vem do Mapper do C#) */}
                  <td>{transaction.categoryName}</td>
                  
                  {/* Coluna: Nome da Pessoa (vem do Mapper do C#) */}
                  <td>{transaction.personName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}