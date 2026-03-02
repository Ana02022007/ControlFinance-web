// Página de exclusão de Pessoa
// Extrai o ID da URL e passa para o componente de confirmação de deleção
// Valida se o ID é válido antes de processar

import { useParams } from "react-router-dom";
import PersonDropDown from "../../../app/Person/PersonDropDown";

export default function PersonDeletePage() {
  // Extrai parâmetro 'id' da URL
  const { id } = useParams();
  // Converte string para número
  const personId = Number(id);

  // Valida se o ID está presente e é um número válido
  if (!id || Number.isNaN(personId)) {
    return <div className="page">ID inválido.</div>;
  }

  // Renderiza componente de confirmação de exclusão
  return <PersonDropDown personId={personId} />;
}
