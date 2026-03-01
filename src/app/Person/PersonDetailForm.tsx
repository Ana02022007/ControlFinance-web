import { useEffect, useState } from "react";
import { createPerson, updatePerson, getPersonById } from "../../services/personServices"; // Adicionei updatePerson
import { useNavigate } from "react-router-dom";

type Person = {
  id: number;
  name: string;
  birthDate: string; // Adicionei birthDate
};

type PersonDetailFormProps = {
  personId?: number;
};

export default function PersonDetailForm({ personId }: PersonDetailFormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState<Person>({
    id: 0,
    name: "",
    birthDate: "",
  });
  // Busca dados se for edição
  useEffect(() => {
    if (personId) {
      setLoading(true);
      getPersonById(personId)
        .then((response) => {
          setPerson(response.data);
        })
        .catch((error) => console.error("Erro ao carregar:", error))
        .finally(() => setLoading(false));
    }
  }, [personId]);

 async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setLoading(true);

  // Criamos o objeto exatamente como o C# espera
  const payload = {
    ...person,
    transaction: [] // Enviando a lista vazia para satisfazer o C#
  };

  try {
    if (personId) {
      await updatePerson(personId, payload);
    } else {
      await createPerson(payload);
      navigate("/person/search");
    }
  } catch (error) {
    console.error("Erro na operação:", error);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="container mt-4">
      <h1>{personId ? "Editando Pessoa" : "Cadastrando Pessoa"}</h1>
      
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-2">
          <label className="form-label">Código</label>
          <input className="form-control" value={person.id} disabled />
        </div>

        <div className="col-md-2">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={person.name}
            onChange={(e) => setPerson({ ...person, name: e.target.value })}
            required
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Data de Nascimento</label>
          <input
            type="date"
            className="form-control"
            value={person.birthDate}
            onChange={(e) => setPerson({ ...person, birthDate: e.target.value })}
            required
          />  
        </div>

        <div className="col-12 mt-3">
          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
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