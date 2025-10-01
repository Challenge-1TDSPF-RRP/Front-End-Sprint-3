import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Receita } from "../../types/tipoReceita";
import Botao from "../../components/BotaoProps/BotaoProps";
import ReceitaProps from "../../components/ReceitaProps/ReceitaProps";

export default function ReceitaMedica() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/receitas")
      .then((res) => res.json())
      .then((data) => setReceitas(data))
      .catch((err) => console.error("Erro ao buscar receitas:", err));
  }, []);

  return (
    <main>
      <h1>Receitas Médicas</h1>

      {receitas.length === 0 ? (
        <div>
          <p>Nenhuma receita cadastrada.</p>
          <button onClick={() => navigate("/editar/receitas")}>
            Cadastrar Primeira Receita Médica
          </button>
        </div>
      ) : (
        <div>
          <ul>
            {receitas.map((r) => (
              <ReceitaProps key={r.id} receita={r} />
            ))}
          </ul>

          <Botao
            texto="Adicionar Nova Receita"
            onClick={() => navigate("/editar/receitas")}
          />
        </div>
      )}
    </main>
  );
}
