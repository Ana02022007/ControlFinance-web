import { useEffect, useState } from "react";
import { getAllPersons } from "../../services/personServices";
import { Link, useNavigate } from "react-router-dom";

type Person = {
  id: number;
  name: string;
  birthDate: string;
};

export default function PersonSearchForm() {
  const navigate = useNavigate();
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllPersons()
      .then((response) => {
        const data = response.data;
        setPersons(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Erro ao buscar:", error))
      .finally(() => setLoading(false));
  }, []);

  function renderActions(person: Person) {
    return (
      <div>
        <button
          onClick={() => navigate(`/person/delete/${person.id}`)}
        >
          Excluir
        </button>
        <button
          onClick={() => navigate(`/person/update/${person.id}`)}
        >
          Editar
        </button>
      </div>
    );
  }

  if (loading) return <div><p>Carregando...</p></div>;

  return (
    <div className="container mt-4">
      <h2>Pessoas</h2>
      <div className="d-flex align-items-center gap-2">
        <Link to="/App">
          <button>Voltar</button>
        </Link>
        <Link to="/person/create">
          <button>Criar Pessoa</button>
        </Link>
      </div>

      {persons.length === 0 ? (
        <div>Nenhuma pessoa encontrada.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover border">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Data de Nascimento</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((person) => (
                <tr key={person.id}>
                  <td>{person.id}</td>
                  <td>{person.name}</td>
                  <td>{new Date(person.birthDate).toLocaleDateString()}</td>
                  <td className="text-center">
                    {renderActions(person)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}