import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePerson } from "../../../services/personServices";

export default function PersonDeletePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const personId = Number(id);

  if (!id || Number.isNaN(personId)) {
    return <div className="page">ID inválido.</div>;
  }

  async function handleDelete() {
    try {
      setLoading(true);
      await deletePerson(personId);
      navigate("/person/search");
    } catch (error) {
      console.error("Erro ao excluir pessoa:", error);
      alert("Não foi possível excluir a pessoa.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h2>Excluir Pessoa</h2>
      <p>Tem certeza que deseja excluir a pessoa de código {personId}?</p>

      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Excluindo..." : "Confirmar exclusão"}
      </button>

      <button type="button" onClick={() => navigate(-1)} disabled={loading}>
        Cancelar
      </button>
    </div>
  );
}
