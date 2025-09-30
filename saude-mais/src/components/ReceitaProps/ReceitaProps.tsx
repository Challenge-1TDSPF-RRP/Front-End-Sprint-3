// components/ReceitaItem.tsx
import { useNavigate } from "react-router-dom";
import type { Receita } from "../../types/tipoReceita";

type Props = {
  receita: Receita;
};

export default function ReceitaProps({ receita }: Props) {
  const navigate = useNavigate();

  return (
    <li style={{ marginBottom: "10px" }}>
      <strong>Data de Emissão:</strong> {receita.dataEmissao} |{" "}
      <strong>Medicamento:</strong> {receita.medicamento} |{" "}
      <strong>Dosagem:</strong> {receita.dosagem} |{" "}
      <strong>Frequência:</strong> {receita.frequencia} |{" "}
      <strong>Duração:</strong> {receita.duracao}
      <button
        onClick={() => navigate(`/editar/receitas/${receita.id}`)}
        style={{ marginLeft: "10px" }}
      >
        Editar
      </button>
    </li>
  );
}
