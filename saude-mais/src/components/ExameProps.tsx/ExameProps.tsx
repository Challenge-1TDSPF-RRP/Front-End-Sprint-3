
import { useNavigate } from "react-router-dom";
import type { Exame } from "../../types/tipoExame";

type Props = {
  exame: Exame;
};

export default function ExameProps({ exame }: Props) {
  const navigate = useNavigate();

  return (
    <li style={{ marginBottom: "10px" }}>
      <strong>Data:</strong> {exame.data} |{" "}
      <strong>Hora:</strong> {exame.hora} |{" "}
      <strong>Status:</strong> {exame.status} |{" "}
      <strong>Tipo:</strong> {exame.tipo} |{" "}
      <strong>Local:</strong> {exame.local}
      <button
        onClick={() => navigate(`/editar/exames/${exame.id}`)}
        style={{ marginLeft: "10px" }}
      >
        Editar
      </button>
    </li>
  );
}
