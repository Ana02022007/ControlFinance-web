// Formulário de visualização de Total de Transações por Categoria
// Exibe relatório com:
// - Receitas, despesas e saldo de cada categoria
// - Totais globais do sistema
// - Formata valores em moeda BRL

import { useEffect, useState } from "react";
import { getTotalsCategories } from "../../services/categoryServices";
import { Link } from "react-router-dom";

// Tipo que define dados de uma categoria no relatório
type Category = {
  id: number;            // ID único da categoria
  description: string;   // Descrição da categoria
  totalRevenue: number;  // Total de receitas desta categoria
  totalExpense: number;  // Total de despesas desta categoria
  total: number;         // Saldo (receita - despesa)
};

// Tipo que define a resposta completa da API
type TotalsResponse = {
  categories: Category[];      // Lista de categorias com totais
  grandTotalRevenue: number;   // Receita total do sistema
  grandTotalExpense: number;   // Despesa total do sistema
  grandTotal: number;          // Saldo total do sistema
};

export default function CategorySearchForm() {
  // Estado: Dados de totais retornados da API
  const [data, setData] = useState<TotalsResponse | null>(null);
  // Estado: Indica se está carregando dados
  const [loading, setLoading] = useState(false);

  // Carrega dados de totais ao montar o componente
  useEffect(() => {
    setLoading(true);
    getTotalsCategories()
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
  if (!data || !data.categories || data.categories.length === 0) {
    return (
      <div className="container mt-4">
        <h2>Total de Transações por Categorias</h2>
        <Link to="/App" className="btn btn-secondary mb-3">Voltar</Link>
        <div className="alert alert-info">Nenhuma categoria encontrada.</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Total de Transações por Categorias</h2>
      
      {/* Botão de navegação */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <Link to="/App">
          <button>Voltar</button>
        </Link>
      </div>

      {/* Tabela com dados de cada categoria */}
      <div className="table-responsive">
        <table className="table table-hover border">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Receitas</th>
              <th>Despesas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapeia cada categoria para uma linha da tabela */}
            {data.categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.description}</td>
                {/* Exibe receitas formatadas em BRL */}
                <td>R$ {category.totalRevenue.toLocaleString()}</td>
                {/* Exibe despesas formatadas em BRL */}
                <td>R$ {category.totalExpense.toLocaleString()}</td>
                {/* Exibe saldo formatado em BRL */}
                <td>
                  R$ {category.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Resumo com totais globais */}
      <div><strong>Quantidade de categorias:</strong> {data.categories.length}</div>
      <div><strong>Total geral de receitas:</strong> R$ {data.grandTotalRevenue.toLocaleString()}</div>
      <div><strong>Total geral de despesas:</strong> R$ {data.grandTotalExpense.toLocaleString()}</div>
      <strong>Saldo geral:</strong> R$ {data.grandTotal.toLocaleString()}
    </div>
  );
}