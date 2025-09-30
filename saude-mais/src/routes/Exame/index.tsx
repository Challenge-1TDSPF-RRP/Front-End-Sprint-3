import { useEffect, useState,} from "react";
import { useNavigate } from "react-router-dom";
import type { Exame } from "../../types/tipoExame";
import ExameProps from "../../components/ExameProps.tsx/ExameProps";
import Botao from "../../components/BotaoProps/BotaoProps";

export default function Exame() {
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
      <h1>Exames</h1>

      {exames.length === 0 ? (
        <div>
          <p>Nenhum exame cadastrado.</p>
          <button onClick={() => navigate("/editar/exames")}>
            Cadastrar Primeiro Exame
          </button>
        </div>
      ) : (
        <div>
          <ul>
            {exames.map(e => (
              <ExameProps key={e.id} exame={e} />
              ))}
          </ul>
                
          <Botao texto="Adicionar Novo Exame" onClick={() => navigate("/editar/exames")} />
          
        </div>
      )}
    </div>
  );
}
