import { useEffect, useState,} from "react";
import { useNavigate } from "react-router-dom";
import type { Exame } from "../../types/tipoExame";

export default function Consultas() {
  const [exames, setExames] = useState<Exame[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/exames")
      .then(res => res.json())
      .then(data => setExames(data))
      .catch(err => console.error("Erro ao buscar exames:", err));
  }, []);

  return (
    <div>
      <h1>Consultas</h1>

      {exames.length === 0 ? (
        <div>
          <p>Nenhum exame cadastrado.</p>
          <button onClick={() => navigate("/editar/exames")}>
            Cadastrar Primeiro Exame
          </button>
        </div>
      ) : (
        <ul>
          {exames.map(e => (
            <li key={e.id} style={{ marginBottom: "10px" }}>
              <strong>Data: </strong> {e.data} | <strong>Hora: </strong> {e.hora} |
              <strong>Status: </strong> {e.status} | <strong>Tipo: </strong> {e.tipo} | <strong>Local: </strong> {e.local}
              <button
                onClick={() => navigate(`/editar/exames/${e.id}`)}
                style={{ marginLeft: "10px" }}
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
