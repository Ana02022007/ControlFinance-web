import { useEffect, useState } from "react";
import { getAllTransactions } from "../../services/transactionServices";
import { Link } from "react-router-dom";

type Transaction = {
  id: number;
  description: string;
  amount: number;
  date: string;
  categoryId: number;
  personId: number;
};

export default function TransactionSearchForm() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllTransactions()
      .then((response) => {
        const data = response.data.transactions || response.data;
        setTransactions(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Erro ao buscar:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div><p>Carregando...</p></div>;

  return (
    <div className="container mt-4">
      <h2>Transações</h2>
      <div className="d-flex align-items-center gap-2">
        <Link to="/">
          <button>Voltar</button>
        </Link>
        <Link to="/transaction/create">
          <button>Criar Transação</button>
        </Link>
      </div>

      {transactions.length === 0 ? (
        <div>Nenhuma transação encontrada.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover border">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.description}</td>
                  <td>R$ {transaction.amount.toFixed(2)}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
