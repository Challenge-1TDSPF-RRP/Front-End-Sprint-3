import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Exame } from "../../types/tipoExame";

export default function EditarExame() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Exame>({
    data: "",
    hora: "",
    status: "",
    tipo: "",
    local: ""
  });

  // Carregar dados existentes se houver id
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/exames/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Exame não encontrado");
          return res.json();
        })
        .then(data => setForm(data))
        .catch(err => console.error("Erro ao buscar exame:", err));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const salvarExame = async () => {
    if (!form.data || !form.hora || !form.status || !form.tipo || !form.local ) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const url = id
        ? `http://localhost:3001/exames/${id}`
        : "http://localhost:3001/exames";
      const method = id ? "PUT" : "POST";

      const resposta = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (resposta.ok) {
        alert(id ? "Exame atualizado!" : "Exame cadastrado!");
        navigate("/exames");
      } else {
        alert("Erro ao salvar exame");
      }
    } catch (error) {
      console.error("Erro ao salvar exame:", error);
    }
  };

  const excluirExame = async () => {
    if (!id) return;

    const confirm = window.confirm("Tem certeza que deseja excluir este exame?");
    if (!confirm) return;

    try {
      const resposta = await fetch(`http://localhost:3001/exames/${id}`, {
        method: "DELETE"
      });

      if (resposta.ok) {
        alert("Exame excluido!");
        navigate("/exames");
      } else {
        alert("Erro ao excluir exame");
      }
    } catch (err) {
      console.error("Erro ao excluir exame:", err);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        salvarExame();
      }}
      style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}
    >
      <h1>{id ? "Editar Exame" : "Cadastrar Exame"}</h1>

      <label>
        Data:
        <input type="date" name="data" value={form.data} onChange={handleChange} required />
      </label>

      <label>
        Hora:
        <input type="time" name="hora" value={form.hora} onChange={handleChange} required />
      </label>

      <label>
        Status:
        <input type="text" name="status" placeholder="Status" value={form.status} onChange={handleChange} required />
      </label>

      <label>
        Tipo:
        <input type="text" name="tipo" placeholder="Tipo" value={form.tipo} onChange={handleChange} required />
      </label>

      <label>
        Local:
        <input type="text" name="local" placeholder="Local" value={form.local} />
      </label>

      <button type="submit">{id ? "Atualizar" : "Cadastrar"}</button>

      {/* Botão de excluir só aparece se estamos editando */}
      {id && (
        <button
          type="button"
          onClick={excluirExame}
          style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}
        >
          Excluir Exame
        </button>
      )}
    </form>
  );
}
