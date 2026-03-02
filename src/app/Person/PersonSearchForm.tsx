// Formulário de busca e listagem de Pessoas
// Exibe tabela com todas as pessoas cadastradas
// Permite navegar para editar ou excluir pessoas

import { useEffect, useState } from "react";
import { getAllPersons } from "../../services/personServices";
import { Link, useNavigate } from "react-router-dom";

// Tipo que define a estrutura de uma pessoa
type Person = {
  id: number;            // ID único da pessoa
  name: string;          // Nome da pessoa
  birthDate: string;     // Data de nascimento (YYYY-MM-DD)
};

export default function PersonSearchForm() {
  const navigate = useNavigate();                    // Hook para navegação
  const [persons, setPersons] = useState<Person[]>([]);  // Lista de pessoas
  const [loading, setLoading] = useState(false);     // Estado de carregamento

  // Carrega pessoas ao montar o componente
  useEffect(() => {
    setLoading(true);
    getAllPersons()
      .then((response) => {
        // Trata resposta e extrai dados
        const data = response.data;
        setPersons(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Erro ao buscar:", error))
      .finally(() => setLoading(false));
  }, []);

  // Renderiza botões de ação para cada pessoa
  function renderActions(person: Person) {
    return (
      <div>
        {/* Botão para excluir pessoa */}
        <button
          onClick={() => navigate(`/person/delete/${person.id}`)}
        >
          Excluir
        </button>
        {/* Botão para editar pessoa */}
        <button
          onClick={() => navigate(`/person/update/${person.id}`)}
        >
          Editar
        </button>
      </div>
    );
  }

  // Mostra mensagem enquanto carrega
  if (loading) return <div><p>Carregando...</p></div>;

  return (
    <div className="container mt-4">
      <h2>Pessoas</h2>
      
      {/* Botões de navegação */}
      <div className="d-flex align-items-center gap-2">
        <Link to="/App">
          <button>Voltar</button>
        </Link>
        <Link to="/person/create">
          <button>Criar Pessoa</button>
        </Link>
      </div>

      {/* Mostra mensagem se não há pessoas cadastradas */}
      {persons.length === 0 ? (
        <div>Nenhuma pessoa encontrada.</div>
      ) : (
        // Tabela com lista de pessoas
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
              {/* Mapeia cada pessoa para uma linha na tabela */}
              {persons.map((person) => (
                <tr key={person.id}>
                  <td>{person.id}</td>
                  <td>{person.name}</td>
                  {/* Converte data para formato local (DD/MM/YYYY) */}
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