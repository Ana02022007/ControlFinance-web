import { useParams } from "react-router-dom";
import PersonDetailForm from "../../../app/Person/PersonDetailForm";

export default function PersonUpdatePage() {
    const { id } = useParams();
    const personId = Number(id);

    if (!id || Number.isNaN(personId)) {
        return <div className="page">ID inválido.</div>;
    }

    return (
        <div className="page">
            <PersonDetailForm personId={personId} />
        </div>
    );
}