import { useEffect, useState } from "react";
import { createTransaction } from "../../services/transactionServices";
import { getAllCategories } from "../../services/categoryServices";
import { getAllPersons } from "../../services/personServices";
import { useNavigate } from "react-router-dom";

type Transaction = {
  id: number;
  description: string;
  amount: number;
  date: string;
  categoryId: number;
  personId: number;
};

export default function TransactionDetailForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [persons, setPersons] = useState<any[]>([]);
  const [transaction, setTransaction] = useState<Transaction>({
    id: 0,
    description: "",
    amount: 0,
    date: "",
    categoryId: 0,
    personId: 0,
  });

  useEffect(() => {
    // Carrega categorias e pessoas
    getAllCategories()
      .then((response) => {
        const data = response.data.categories || response.data;
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Erro ao carregar categorias:", error));

    getAllPersons()
      .then((response) => {
        const data = response.data.persons || response.data;
        setPersons(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Erro ao carregar pessoas:", error));
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const payload = {
      description: transaction.description,
      amount: transaction.amount,
      date: transaction.date,
      categoryId: transaction.categoryId,
      personId: transaction.personId,
    };

    try {
      await createTransaction(payload);
      navigate("/transaction/search");
    } catch (error) {
      console.error("Erro na operação:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h1>Cadastrando Transação</h1>
      
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-2">
          <label className="form-label">Código</label>
          <input className="form-control" value={transaction.id} disabled />
        </div>

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

        <div className="col-md-2">
          <label className="form-label">Valor</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={transaction.amount}
            onChange={(e) => setTransaction({ ...transaction, amount: parseFloat(e.target.value) })}
            required
          />
        </div>

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

        <div className="col-md-3">
          <label className="form-label">Categoria</label>
          <select
            className="form-control"
            value={transaction.categoryId}
            onChange={(e) => setTransaction({ ...transaction, categoryId: parseInt(e.target.value) })}
            required
          >
            <option value={0}>Selecione...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

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

        <div className="col-12 mt-3">
          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
          <button 
            type="button" 
            disabled={loading} 
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
