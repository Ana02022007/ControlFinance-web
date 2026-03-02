import { useEffect, useState } from "react";
import { getTotalsCategories } from "../../services/categoryServices";
import { Link } from "react-router-dom";

// 1. Defina o tipo de cada categoria
type Category = {
  id: number;
  description: string;
  totalRevenue: number;
  totalExpense: number;
  total: number;
};

// 2. Defina o tipo do objeto que a API retorna
type TotalsResponse = {
  categories: Category[];
  grandTotalRevenue: number;
  grandTotalExpense: number;
  grandTotal: number;
};

export default function CategorySearchForm() {
  const [data, setData] = useState<TotalsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTotalsCategories()
      .then((response) => {
        setData(response.data); 
      })
      .catch((error) => console.error("Erro ao buscar:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container mt-4"><p>Carregando...</p></div>;

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
      <div className="d-flex align-items-center gap-2 mb-3">
        <Link to="/App">
          <button>Voltar</button>
        </Link>
      </div>

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
            {data.categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.description}</td>
                <td>R$ {category.totalRevenue.toLocaleString()}</td>
                <td>R$ {category.totalExpense.toLocaleString()}</td>
                <td>
                  R$ {category.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div><strong>Quantidade de categorias:</strong> {data.categories.length}</div>
      <div><strong>Total geral de receitas:</strong> R$ {data.grandTotalRevenue.toLocaleString()}</div>
      <div><strong>Total geral de despesas:</strong> R$ {data.grandTotalExpense.toLocaleString()}</div>
      <strong>Saldo geral:</strong> R$ {data.grandTotal.toLocaleString()}
    </div>
  );
}