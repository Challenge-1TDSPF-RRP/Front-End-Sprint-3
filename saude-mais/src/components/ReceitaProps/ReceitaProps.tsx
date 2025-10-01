// components/ReceitaProps.tsx
import { useNavigate } from "react-router-dom";
import type { Receita } from "../../types/tipoReceita";

type Props = {
  receita: Receita;
};

export default function ReceitaProps({ receita }: Props) {
  const navigate = useNavigate();

  return (
    <li className="flex justify-between items-center bg-blue-100 p-4 rounded mb-3 shadow hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-700 flex-wrap">
        <span>
          <strong>Data de Emissão:</strong> {receita.dataEmissao}
        </span>
        <span>
          <strong>Medicamento:</strong> {receita.medicamento}
        </span>
        <span>
          <strong>Dosagem:</strong> {receita.dosagem}
        </span>
        <span>
          <strong>Frequência:</strong> {receita.frequencia}
        </span>
        <span>
          <strong>Duração:</strong> {receita.duracao}
        </span>
      </div>
      <button
        onClick={() => navigate(`/editar/receitas/${receita.id}`)}
        className="bg-blue-400 text-white font-bold py-2 px-3 rounded hover:bg-blue-500 transition"
      >
        Editar
      </button>
    </li>
  );
}
