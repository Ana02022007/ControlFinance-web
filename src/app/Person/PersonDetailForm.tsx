// Formulário de criação e edição de Pessoa
// Permite cadastrar uma nova pessoa ou editar uma existente
// Campos: nome e data de nascimento

import { useEffect, useState } from "react";
import { createPerson, updatePerson, getPersonById } from "../../services/personServices";
import { useNavigate } from "react-router-dom";

// Tipo que define a estrutura de uma pessoa
type Person = {
  id: number;        // ID único da pessoa
  name: string;      // Nome da pessoa
  birthDate: string; // Data de nascimento (YYYY-MM-DD)
};

// Props: personId opcional para edição
type PersonDetailFormProps = {
  personId?: number;
};

export default function PersonDetailForm({ personId }: PersonDetailFormProps) {
  const navigate = useNavigate();                    // Hook para navegação
  const [loading, setLoading] = useState(false);     // Estado de envio do formulário
  const [person, setPerson] = useState<Person>({
    id: 0,
    name: "",
    birthDate: "",
  });

  // Se houver personId, carrega os dados da pessoa para edição
  useEffect(() => {
    if (personId) {
      setLoading(true);
      getPersonById(personId)
        .then((response) => {
          // Coloca dados da pessoa no formulário
          setPerson(response.data);
        })
        .catch((error) => console.error("Erro ao carregar:", error))
        .finally(() => setLoading(false));
    }
  }, [personId]);

  // Processa o envio do formulário (criação ou edição)
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();  // Evita recarga da página
    setLoading(true);

    // Prepara dados para enviar
    const payload = {
      ...person,
      transaction: []
    };

    try {
      if (personId) {
        // Modo edição: atualiza pessoa existente
        await updatePerson(personId, payload);
      } else {
        // Modo criação: cria nova pessoa
        await createPerson(payload);
        navigate("/person/search");
      }
    } catch (error) {
      // Log de erro para debugging
      console.error("Erro na operação:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h1>{personId ? "Editando Pessoa" : "Cadastrando Pessoa"}</h1>
      
      {/* Formulário principal */}
      <form onSubmit={handleSubmit} className="row g-3">
        
        {/* Campo: Código (somente leitura) */}
        <div className="col-md-2">
          <label className="form-label">Código</label>
          <input className="form-control" value={person.id} disabled />
        </div>

        {/* Campo: Nome */}
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

        {/* Campo: Data de Nascimento */}
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