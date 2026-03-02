// Formulário de visualização de Total de Transações por Pessoa
// Exibe relatório com:
// - Receitas, despesas e saldo de cada pessoa
// - Totais globais do sistema
// - Formata valores em moeda BRL

import { useEffect, useState } from "react";
import { getTotalsPersons } from "../../services/personServices";
import { Link } from "react-router-dom";

// Tipo que define dados de uma pessoa no relatório
type Person = {
  id: number;            // ID único da pessoa
  name: string;          // Nome da pessoa
  totalRevenue: number;  // Total de receitas
  totalExpense: number;  // Total de despesas
  total: number;         // Saldo (receita - despesa)
};

// Tipo que define a resposta completa da API
type TotalsResponse = {
  persons: Person[];           // Lista de pessoas com totais
  grandTotalRevenue: number;   // Receita total do sistema
  grandTotalExpense: number;   // Despesa total do sistema
  grandTotal: number;          // Saldo total do sistema
};

export default function PersonSearchForm() {
  // Estado: Dados de totais retornados da API
  const [data, setData] = useState<TotalsResponse | null>(null);
  // Estado: Indica se está carregando dados
  const [loading, setLoading] = useState(false);

  // Carrega dados de totais ao montar o componente
  useEffect(() => {
    setLoading(true);
    getTotalsPersons()
      .then((response) => {
        // Armazena dados retornados da API
        setData(response.data); 
      })
      .catch((error) => console.error("Erro ao buscar:", error))
      .finally(() => setLoading(false));
  }, []);

  // Mostra mensagem enquanto carrega
  if (loading) return <div className="container mt-4"><p>Carregando...</p></div>;

  // Se não houver dados ou lista vazia
  if (!data || !data.persons || data.persons.length === 0) {
    return (
      <div className="container mt-4">
        <h2>Total de Transações por Pessoas</h2>
        <Link to="/App" className="btn btn-secondary mb-3">Voltar</Link>
        <div className="alert alert-info">Nenhuma pessoa encontrada.</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Total de Transações por Pessoas</h2>
      
      {/* Botão de navegação */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <Link to="/App">
          <button className="btn btn-primary">Voltar</button>
        </Link>
      </div>

      {/* Tabela com dados de cada pessoa */}
      <div className="table-responsive">
        <table className="table table-hover border">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Receitas</th>
              <th>Despesas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapeia cada pessoa para uma linha da tabela */}
            {data.persons.map((person) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.name}</td>
                {/* Exibe receitas formatadas em BRL */}
                <td>R$ {person.totalRevenue.toLocaleString()}</td>
                {/* Exibe despesas formatadas em BRL */}
                <td>R$ {person.totalExpense.toLocaleString()}</td>
                {/* Exibe saldo com cor: verde se positivo, vermelho se negativo */}
                <td className={person.total >= 0 ? "text-success" : "text-danger"}>
                  R$ {person.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Resumo com totais globais */}
      <div><strong>Quantidade de pessoas:</strong> {data.persons.length}</div>
      <div><strong>Total geral de receitas:</strong> R$ {data.grandTotalRevenue.toLocaleString()}</div>
      <div><strong>Total geral de despesas:</strong> R$ {data.grandTotalExpense.toLocaleString()}</div>
      <div className="h5 mt-2">
        <strong>Saldo geral:</strong> R$ {data.grandTotal.toLocaleString()}
      </div>
    </div>
  );
}