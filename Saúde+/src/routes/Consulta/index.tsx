import { useEffect, useState,} from "react";
import { useNavigate } from "react-router-dom";
import type { Consulta } from "../../types/tipoConsulta";


export default function Consultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/consultas")
      .then(res => res.json())
      .then(data => setConsultas(data))
      .catch(err => console.error("Erro ao buscar consultas:", err));
  }, []);

  return (
    <div>
      <h1>Consultas</h1>

      {consultas.length === 0 ? (
        <div>
          <p>Nenhuma consulta cadastrada.</p>
          <button onClick={() => navigate("/editar/consultas")}>
            Cadastrar Primeira Consulta
          </button>
        </div>
      ) : (
        <ul>
          {consultas.map(c => (
            <li key={c.id} style={{ marginBottom: "10px" }}>
              <strong>Data:</strong> {c.data} | <strong>Hora:</strong> {c.hora} |
              <strong>Status:</strong> {c.status} | <strong>Motivo:</strong> {c.motivo} |
              <button
                onClick={() => navigate(`/editar/consultas/${c.id}`)}
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
