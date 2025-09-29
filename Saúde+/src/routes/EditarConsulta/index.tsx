import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Consulta } from "../../types/tipoConsulta";

export default function EditarConsultas() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Consulta>({
    data: "",
    hora: "",
    status: "",
    motivo: ""
  });

  // Carregar dados existentes se houver id
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/consultas/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Consulta não encontrada");
          return res.json();
        })
        .then(data => setForm(data))
        .catch(err => console.error("Erro ao buscar consulta:", err));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const salvarConsulta = async () => {
    if (!form.data || !form.hora || !form.status || !form.motivo ) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const url = id
        ? `http://localhost:3001/consultas/${id}`
        : "http://localhost:3001/consultas";
      const method = id ? "PUT" : "POST";

      const resposta = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (resposta.ok) {
        alert(id ? "Consulta atualizada!" : "Consulta cadastrada!");
        navigate("/consultas");
      } else {
        alert("Erro ao salvar consulta");
      }
    } catch (error) {
      console.error("Erro ao salvar consulta:", error);
    }
  };

  // Função para excluir
  const excluirConsulta = async () => {
    if (!id) return;

    const confirm = window.confirm("Tem certeza que deseja excluir esta consulta?");
    if (!confirm) return;

    try {
      const resposta = await fetch(`http://localhost:3001/consultas/${id}`, {
        method: "DELETE"
      });

      if (resposta.ok) {
        alert("Consulta excluída!");
        navigate("/consultas");
      } else {
        alert("Erro ao excluir consulta");
      }
    } catch (err) {
      console.error("Erro ao excluir consulta:", err);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        salvarConsulta();
      }}
      style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}
    >
      <h1>{id ? "Editar Consulta" : "Cadastrar Consulta"}</h1>

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
        Motivo:
        <input type="text" name="motivo" placeholder="Motivo" value={form.motivo} onChange={handleChange} required />
      </label>

      <button type="submit">{id ? "Atualizar" : "Cadastrar"}</button>

      {/* Botão de excluir só aparece se estamos editando */}
      {id && (
        <button
          type="button"
          onClick={excluirConsulta}
          style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}
        >
          Excluir Consulta
        </button>
      )}
    </form>
  );
}
