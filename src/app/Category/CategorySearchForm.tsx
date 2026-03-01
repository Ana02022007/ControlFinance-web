import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoryServices";
import { Link } from "react-router-dom";

type Category = {
  id: number;
  purpose: string;
  description: string;
};

export default function CategorySearchForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllCategories()
      .then((response) => {
        const data = response.data.categories || response.data;
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Erro ao buscar:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div><p>Carregando...</p></div>;

  return (
    <div className="container mt-4">
      <h2>Categorias</h2>
      <div className="d-flex align-items-center gap-2">
        <Link to="/">
          <button>Voltar</button>
        </Link>
        <Link to="/category/create">
          <button>Criar Categoria</button>
        </Link>
      </div>

      {categories.length === 0 ? (
        <div>Nenhuma categoria encontrada.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover border">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Finalidade</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.description}</td>
                  <td>{category.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
