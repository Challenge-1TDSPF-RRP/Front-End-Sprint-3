import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Consulta } from "../../types/tipoConsulta";
import Botao from "../../components/BotaoProps/BotaoProps";
import ConsultaProps from "../../components/ConsultaProps/ConsultaProps";

export default function Consulta() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/consultas")
      .then((res) => res.json())
      .then((data) => setConsultas(data))
      .catch((err) => console.error("Erro ao buscar consultas:", err));
  }, []);

  return (
    <main>
      <h1>Consultas</h1>

      {consultas.length === 0 ? (
        <div>
          <p>Nenhuma consulta cadastrada.</p>
          <button onClick={() => navigate("/editar/consultas")}>
            Cadastrar Primeira Consulta
          </button>
        </div>
      ) : (
        <div>
          <ul>
            {consultas.map((c) => (
              <ConsultaProps key={c.id} consulta={c} />
            ))}
          </ul>

          <Botao
            texto="Adicionar Nova Consulta"
            onClick={() => navigate("/editar/consultas")}
          />
        </div>
      )}
    </main>
  );
}
