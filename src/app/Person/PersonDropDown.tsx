// Componente de confirmção para exclusão de Pessoa
// Mostra diálogo de confirmação antes de deletar uma pessoa
// Se confirmado, exclui a pessoa e redireciona para lista

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePerson } from "../../services/personServices";

// Props: personId obrigatório para saber qual pessoa deletar
type PersonDropDownProps = {
  personId: number;
};

export default function PersonDropDown({ personId }: PersonDropDownProps) {
  const navigate = useNavigate();                    // Hook para navegação
  const [loading, setLoading] = useState(false);     // Estado durante exclusão

  // Função para excluir a pessoa
  async function handleDelete() {
    try {
      setLoading(true);
      // Chama serviço para deletar pessoa
      await deletePerson(personId);
      // Redireciona para lista de pessoas
      navigate("/person/search");
    } catch (error) {
      // Log de erro
      console.error("Erro ao excluir pessoa:", error);
      // Mostra alerta com mensagem de erro
      alert("Não foi possível excluir a pessoa. Verifique se ela possui dependências.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page container mt-4">
      {/* Card de aviso de exclusão */}
      <div className="card border-danger">
        <div className="card-header bg-danger text-white">
          <h2 className="h5 mb-0">Confirmar Exclusão</h2>
        </div>
        <div className="card-body">
          <p>Tem certeza que deseja excluir a pessoa de código <strong>{personId}</strong>?</p>
          
          {/* Botões de ação */}
          <div className="d-flex gap-2">
            {/* Botão Confirmar exclusão */}
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Excluindo..." : "Confirmar exclusão"}
            </button>
            {/* Botão Cancelar */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}