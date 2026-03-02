import { useState } from "react";
import { createCategory } from "../../services/categoryServices";
import { useNavigate } from "react-router-dom";

type Category = {
  id: number;
  description: string;
  purpose: string;
};

export default function CategoryDetailForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<Category>({
    id: 0,
    purpose: "",
    description: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const payload = {
      ...category,
      purpose: category.purpose,
    };

    try {
      await createCategory(payload);
      navigate("/category/search");
    } catch (error) {
      console.error("Erro na operação:", error);
      if ((error as any)?.response?.data) {
        console.log(JSON.stringify((error as any).response.data, null, 2));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h1>{"Cadastrando Categoria"}</h1>
      
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-2">
          <label className="form-label">Código</label>
          <input className="form-control" value={category.id} disabled />
        </div>

        <div className="col-md-6">
          <label className="form-label">Descrição</label>
          <input
            type="text"
            className="form-control"
            value={category.description}
            onChange={(e) => setCategory({ ...category, description: e.target.value })}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Finalidade</label>
          <select
            className="form-control"
            value={category.purpose}
            onChange={(e) => setCategory({ ...category, purpose: e.target.value })}
            required
          >
            <option value="">Selecione</option>
            <option value="RECEITA">Receita</option>
            <option value="DESPESA">Despesa</option>
            <option value="AMBAS">Ambas</option>
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
