import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePerson } from "../../services/personServices";

type PersonDropDownProps = {
  personId: number;
};

export default function PersonDropDown({ personId }: PersonDropDownProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);
      await deletePerson(personId);
      navigate("/person/search");
    } catch (error) {
      console.error("Erro ao excluir pessoa:", error);
      alert("Não foi possível excluir a pessoa. Verifique se ela possui dependências.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page container mt-4">
      <div className="card border-danger">
        <div className="card-header bg-danger text-white">
          <h2 className="h5 mb-0">Confirmar Exclusão</h2>
        </div>
        <div className="card-body">
          <p>Tem certeza que deseja excluir a pessoa de código <strong>{personId}</strong>?</p>
          
          <div className="d-flex gap-2">
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Excluindo..." : "Confirmar exclusão"}
            </button>
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