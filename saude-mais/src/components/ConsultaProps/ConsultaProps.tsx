// components/ConsultaItem.tsx
import { useNavigate } from "react-router-dom";
import type { Consulta } from "../../types/tipoConsulta";

type Props = {
  consulta: Consulta;
};

export default function ConsultaProps({ consulta }: Props) {
  const navigate = useNavigate();

  return (
    <li style={{ marginBottom: "10px" }}>
      <strong>Data:</strong> {consulta.data} | 
      <strong> Hora:</strong> {consulta.hora} | 
      <strong> Status:</strong> {consulta.status} | 
      <strong> Motivo:</strong> {consulta.motivo} |
      <button 
        onClick={() => navigate(`/editar/consultas/${consulta.id}`)} 
        style={{ marginLeft: "10px" }}
      >
        Editar
      </button>
    </li>
  );
}
