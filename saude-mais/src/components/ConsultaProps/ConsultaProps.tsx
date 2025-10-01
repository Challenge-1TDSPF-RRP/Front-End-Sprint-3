// components/ConsultaProps.tsx
import { useNavigate } from "react-router-dom";
import type { Consulta } from "../../types/tipoConsulta";

type Props = {
  consulta: Consulta;
};

export default function ConsultaProps({ consulta }: Props) {
  const navigate = useNavigate();

  return (
    <li className="flex justify-between items-center bg-blue-100 p-4 rounded mb-3 shadow hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-700 flex-wrap">
        <span>
          <strong>Data:</strong> {consulta.data}
        </span>
        <span>
          <strong>Hora:</strong> {consulta.hora}
        </span>
        <span>
          <strong>Status:</strong> {consulta.status}
        </span>
        <span>
          <strong>Motivo:</strong> {consulta.motivo}
        </span>
      </div>
      <button
        onClick={() => navigate(`/editar/consultas/${consulta.id}`)}
        className="bg-blue-400 text-white font-bold py-2 px-1 rounded hover:bg-blue-500 transition"
      >
        Editar
      </button>
    </li>
  );
}
