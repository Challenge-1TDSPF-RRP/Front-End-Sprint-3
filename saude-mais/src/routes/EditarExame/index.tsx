// pages/EditarExame.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Exame } from "../../types/tipoExame";

export default function EditarExame() {

  useEffect(() => {
    document.title = "Editar Exame";
  }, []);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Exame>({
    data: "",
    hora: "",
    status: "",
    tipo: "",
    local: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/exames/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Exame não encontrado");
          return res.json();
        })
        .then((data) => setForm(data))
        .catch((err) => console.error("Erro ao buscar exame:", err));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const salvarExame = async () => {
    if (!form.data || !form.hora || !form.status || !form.tipo || !form.local) {
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

    const confirm = window.confirm(
      "Tem certeza que deseja excluir este exame?"
    );
    if (!confirm) return;

    try {
      const resposta = await fetch(`http://localhost:3001/exames/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
        alert("Exame excluído!");
        navigate("/exames");
      } else {
        alert("Erro ao excluir exame");
      }
    } catch (err) {
      console.error("Erro ao excluir exame:", err);
    }
  };

  return (
    <main className="flex justify-center items-center bg-blue-200 w-[100vw] h-[85vh]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          salvarExame();
        }}
        className="bg-gray-50 p-8 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-md"
      >
        <h1 className="text-blue-300 text-xl font-bold mb-4">
          {id ? "Editar Exame" : "Cadastrar Exame"}
        </h1>

        <label className="flex flex-col">
          <span className="font-semibold text-gray-700">Data:</span>
          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="font-semibold text-gray-700">Hora:</span>
          <input
            type="time"
            name="hora"
            value={form.hora}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="font-semibold text-gray-700">Status:</span>
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={form.status}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="font-semibold text-gray-700">Tipo:</span>
          <input
            type="text"
            name="tipo"
            placeholder="Tipo"
            value={form.tipo}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="font-semibold text-gray-700">Local:</span>
          <input
            type="text"
            name="local"
            placeholder="Local"
            value={form.local}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-400 text-white font-bold py-2 rounded hover:bg-blue-500 transition"
        >
          {id ? "Atualizar" : "Cadastrar"}
        </button>

        {id && (
          <button
            type="button"
            onClick={excluirExame}
            className="bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition"
          >
            Excluir Exame
          </button>
        )}
      </form>
    </main>
  );
}
