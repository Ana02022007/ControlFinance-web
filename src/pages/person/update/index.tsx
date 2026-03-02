// Página de edição de Pessoa
// Extrai o ID da URL e passa para o formulário de detalhe em modo edição
// Valida se o ID é válido antes de processar

import { useParams } from "react-router-dom";
import PersonDetailForm from "../../../app/Person/PersonDetailForm";

export default function PersonUpdatePage() {
  // Extrai parâmetro 'id' da URL
  const { id } = useParams();
  // Converte string para número
  const personId = Number(id);

  // Valida se o ID está presente e é um número válido
  if (!id || Number.isNaN(personId)) {
    return <div className="page">ID inválido.</div>;
  }

  return (
    <div className="page">
      {/* Passa personId para ativar modo edição no formulário */}
      <PersonDetailForm personId={personId} />
    </div>
  );
}