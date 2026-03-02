// Formulário de criação de Categoria
// Permite cadastrar uma nova categoria no sistema
// Campos: descrição e finalidade (Receita, Despesa ou Ambas)

import { useState } from "react";
import { createCategory } from "../../services/categoryServices";
import { useNavigate } from "react-router-dom";

// Tipo que define a estrutura de uma categoria
type Category = {
  id: number;        // ID gerado automaticamente pelo servidor
  description: string;  // Descrição da categoria
  purpose: string;   // Finalidade: RECEITA, DESPESA, AMBAS
};

export default function CategoryDetailForm() {
  const navigate = useNavigate();                    // Hook para navegação
  const [loading, setLoading] = useState(false);     // Estado de envio do formulário
  const [category, setCategory] = useState<Category>({
    id: 0,
    purpose: "",
    description: "",
  });

  // Processa o envio do formulário
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();  // Evita recarga da página
    setLoading(true);

    // Prepara dados para enviar
    const payload = {
      ...category,
      purpose: category.purpose,
    };

    try {
      // Envia categoria para o backend
      await createCategory(payload);
      // Redireciona para lista de categorias
      navigate("/category/search");
    } catch (error) {
      // Log de erro para debugging
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
      
      {/* Formulário principal */}
      <form onSubmit={handleSubmit} className="row g-3">
        
        {/* Campo: Código (somente leitura) */}
        <div className="col-md-2">
          <label className="form-label">Código</label>
          <input className="form-control" value={category.id} disabled />
        </div>

        {/* Campo: Descrição */}
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

        {/* Campo: Finalidade (Receita, Despesa, Ambas) */}
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

        {/* Botões de ação */}
        <div className="col-12 mt-3">
          {/* Botão Salvar */}
          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
          {/* Botão Cancelar */}
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
