import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Receita } from "../../types/tipoReceita";

export default function EditarReceita() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Receita>({
    dataEmissao: "",
    medicamento: "",
    dosagem: "",
    frequencia: "",
    duracao: "",
  });

  // Carregar dados existentes se houver id
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/receitas/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Receita não encontrada");
          return res.json();
        })
        .then((data) => setForm(data))
        .catch((err) => console.error("Erro ao buscar receita:", err));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const salvarReceita = async () => {
    if (
      !form.dataEmissao ||
      !form.medicamento ||
      !form.dosagem ||
      !form.frequencia ||
      !form.duracao
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const url = id
        ? `http://localhost:3001/receitas/${id}`
        : "http://localhost:3001/receitas";
      const method = id ? "PUT" : "POST";

      const resposta = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (resposta.ok) {
        alert(id ? "Receita atualizada!" : "Receita cadastrada!");
        navigate("/receitas");
      } else {
        alert("Erro ao salvar receita");
      }
    } catch (error) {
      console.error("Erro ao salvar a receita:", error);
    }
  };

  const excluirReceita = async () => {
    if (!id) return;

    const confirm = window.confirm(
      "Tem certeza que deseja excluir esta receita?"
    );
    if (!confirm) return;

    try {
      const resposta = await fetch(`http://localhost:3001/receita/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
        alert("Receita excluida!");
        navigate("/receitas");
      } else {
        alert("Erro ao excluir receita");
      }
    } catch (err) {
      console.error("Erro ao excluir receita:", err);
    }
  };

  return (
    <main>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            salvarReceita();
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "400px",
          }}
        >
          <h1>{id ? "Editar receita" : "Cadastrar receita"}</h1>

          <label>
            Data de emissão:
            <input
              type="date"
              name="dataEmissao"
              placeholder="Data de emissão"
              value={form.dataEmissao}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Medicamento:
            <input
              type="text"
              name="medicamento"
              placeholder="Medicamento"
              value={form.medicamento}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Dosagem:
            <input
              type="text"
              name="dosagem"
              placeholder="Dosagem"
              value={form.dosagem}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Frequência:
            <input
              type="text"
              name="frequencia"
              placeholder="Frequência"
              value={form.frequencia}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Duração do tratamento:
            <input
              type="text"
              name="duracao"
              placeholder="Duração do tratamento"
              value={form.duracao}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">{id ? "Atualizar" : "Cadastrar"}</button>

          {/* Botão de excluir só aparece se estamos editando */}
          {id && (
            <button
              type="button"
              onClick={excluirReceita}
              style={{
                marginTop: "10px",
                backgroundColor: "red",
                color: "white",
              }}
            >
              Excluir Receita
            </button>
          )}
        </form>
      </div>
    </main>
  );
}
