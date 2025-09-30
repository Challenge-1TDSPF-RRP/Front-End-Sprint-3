import { useEffect, useState,} from "react";
import { useNavigate } from "react-router-dom";
import type { Receita } from "../../types/tipoReceita";

export default function ReceitaMedica() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/receitas")
      .then(res => res.json())
      .then(data => setReceitas(data))
      .catch(err => console.error("Erro ao buscar receitas:", err));
  }, []);

  return (
    <div>
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
            {receitas.map(r => (
                <li key={r.id} style={{ marginBottom: "10px" }}>
                <strong>Data de Emissão: </strong> {r.dataEmissao} | <strong>Medicamento: </strong> {r.medicamento} |
                <strong>Dosagem: </strong> {r.dosagem} | <strong>Frequência: </strong> {r.frequencia} | <strong>Duração do tratamento: </strong> {r.duracao}
                <button onClick={() => navigate(`/editar/receitas/${r.id}`)} style={{ marginLeft: "10px" }}>
                    Editar
                </button>
                </li>
            ))}
            </ul>

            <button onClick={() => navigate("/editar/receitas")} style={{ marginTop: "20px" }}>
                Adicionar Nova Receita
            </button>
        </div>
      )}
    </div>
  );
}
