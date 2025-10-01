import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Exame } from "../../types/tipoExame";
import ExameProps from "../../components/ExameProps/ExameProps";
import Botao from "../../components/BotaoProps/BotaoProps";

export default function Exame() {

  useEffect(() => {
    document.title = "Exames";
  }, []);

  const [exames, setExames] = useState<Exame[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/exames")
      .then((res) => res.json())
      .then((data) => setExames(data))
      .catch((err) => console.error("Erro ao buscar exames:", err));
  }, []);

  return (
    <main className="flex bg-blue-200 w-[100vw] h-[85vh] justify-center items-center">
      <div className="flex bg-gray-50 rounded w-[60vw] p-10 flex-col items-center">
        <h1 className="text-blue-400 font-bold text-2xl mb-6">Exames</h1>

        {exames.length === 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-blue-400 font-semibold mb-4 bg-blue-100 p-1 rounded">
              Nenhum exame cadastrado.
            </p>
            <button
              className="bg-blue-400 text-white font-bold py-2 px-1 rounded hover:bg-blue-500 transition"
              onClick={() => navigate("/editar/exames")}
            >
              Cadastrar Primeiro Exame
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <ul className="w-full mb-6">
              {exames.map((e) => (
                <ExameProps key={e.id} exame={e} />
              ))}
            </ul>

            <Botao
              texto="Adicionar Novo Exame"
              onClick={() => navigate("/editar/exames")}
            />
          </div>
        )}
      </div>
    </main>
  );
}
