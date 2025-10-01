import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Consulta } from "../../types/tipoConsulta";
import Botao from "../../components/BotaoProps/BotaoProps";
import ConsultaProps from "../../components/ConsultaProps/ConsultaProps";

export default function Consulta() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Consultas";
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/consultas")
      .then((res) => res.json())
      .then((data) => setConsultas(data))
      .catch((err) => console.error("Erro ao buscar consultas:", err));
  }, []);

  return (
    <main className="flex bg-blue-200 w-[100vw] h-[85vh] justify-center items-center">
      <div className="flex bg-gray-50 rounded w-[60vw] p-10 flex-col items-center">
        <h1 className="text-blue-400 font-bold text-2xl mb-6">Consultas</h1>

        {consultas.length === 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-blue-400 font-semibold mb-4 bg-blue-100 p-1 rounded">
              Nenhuma consulta cadastrada.
            </p>
            <button
              className="bg-blue-400 text-white font-bold py-2 px-1 rounded hover:bg-blue-500 transition"
              onClick={() => navigate("/editar/consultas")}
            >
              Cadastrar Primeira Consulta
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <ul className="w-full mb-6">
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
      </div>
    </main>
  );
}