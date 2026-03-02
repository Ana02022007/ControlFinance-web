import { useEffect, useState } from "react";
import { getTotalsPersons } from "../../services/personServices";
import { Link } from "react-router-dom";

// 1. Defina o tipo de cada indivíduo
type Person = {
  id: number;
  name: string;
  totalRevenue: number;
  totalExpense: number;
  total: number;
};

// 2. Defina o tipo do objeto que a API retorna
type TotalsResponse = {
  persons: Person[];
  grandTotalRevenue: number;
  grandTotalExpense: number;
  grandTotal: number;
};

export default function PersonSearchForm() {
  // Inicializamos como null ou com valores zerados para evitar erros de undefined
  const [data, setData] = useState<TotalsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTotalsPersons()
      .then((response) => {
        // Ajuste conforme a estrutura exata do seu axios/fetch
        setData(response.data); 
      })
      .catch((error) => console.error("Erro ao buscar:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container mt-4"><p>Carregando...</p></div>;

  // Se não houver dados ou a lista estiver vazia
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
      <div className="d-flex align-items-center gap-2 mb-3">
        <Link to="/App">
          <button className="btn btn-primary">Voltar</button>
        </Link>
      </div>

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
            {data.persons.map((person) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td>R$ {person.totalRevenue.toLocaleString()}</td>
                <td>R$ {person.totalExpense.toLocaleString()}</td>
                <td className={person.total >= 0 ? "text-success" : "text-danger"}>
                  R$ {person.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        <div><strong>Quantidade de pessoas:</strong> {data.persons.length}</div>
        <div><strong>Total geral de receitas:</strong> R$ {data.grandTotalRevenue.toLocaleString()}</div>
        <div><strong>Total geral de despesas:</strong> R$ {data.grandTotalExpense.toLocaleString()}</div>
        <div className="h5 mt-2">
          <strong>Saldo geral:</strong> R$ {data.grandTotal.toLocaleString()}
      </div>
    </div>
  );
}