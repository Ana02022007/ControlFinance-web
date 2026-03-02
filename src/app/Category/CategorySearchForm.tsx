// Formulário de busca e listagem de Categorias
// Exibe tabela com todas as categorias cadastradas
// Permite criar novas categorias

import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoryServices";
import { Link } from "react-router-dom";

// Tipo que define a estrutura de uma categoria
type Category = {
  id: number;           // ID único da categoria
  purpose: string;      // Finalidade: RECEITA, DESPESA, AMBAS
  description: string;  // Descrição da categoria
};

export default function CategorySearchForm() {
  const [categories, setCategories] = useState<Category[]>([]);  // Lista de categorias
  const [loading, setLoading] = useState(false);                 // Estado de carregamento

  // Carrega categorias ao montar o componente
  useEffect(() => {
    setLoading(true);
    getAllCategories()
      .then((response) => {
        // Trata resposta e extrai dados
        const data = response.data;
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Erro ao buscar:", error))
      .finally(() => setLoading(false));
  }, []);

  // Mostra mensagem enquanto carrega
  if (loading) return <div><p>Carregando...</p></div>;

  return (
    <div className="container mt-4">
      <h2>Categorias</h2>
      
      {/* Botões de navegação */}
      <div className="d-flex align-items-center gap-2">
        <Link to="/">
          <button>Voltar</button>
        </Link>
        <Link to="/category/create">
          <button>Criar Categoria</button>
        </Link>
      </div>

      {/* Mostra mensagem se não há categorias cadastradas */}
      {categories.length === 0 ? (
        <div>Nenhuma categoria encontrada.</div>
      ) : (
        // Tabela com lista de categorias
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
              {/* Mapeia cada categoria para uma linha na tabela */}
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
