import { useParams } from "react-router-dom";
import PersonDropDown from "../../../app/Person/PersonDropDown";

export default function PersonDeletePage() {
  const { id } = useParams();
  const personId = Number(id);

  if (!id || Number.isNaN(personId)) {
    return <div className="page">ID inválido.</div>;
  }

  return <PersonDropDown personId={personId} />;
}
