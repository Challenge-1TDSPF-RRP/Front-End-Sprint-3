// pages/EditarReceita.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Receita } from "../../types/tipoReceita";

export default function EditarReceita() {

  useEffect(() => {
    document.title = "Editar Receita Médica";
  }, []);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Receita>({
    dataEmissao: "",
    medicamento: "",
    dosagem: "",
    frequencia: "",
    duracao: "",
  });

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
      const resposta = await fetch(`http://localhost:3001/receitas/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
        alert("Receita excluída!");
        navigate("/receitas");
      } else {
        alert("Erro ao excluir receita");
      }
    } catch (err) {
      console.error("Erro ao excluir receita:", err);
    }
  };

  return (
    <main className="flex justify-center items-center bg-blue-200 w-[100vw] h-[85vh]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          salvarReceita();
        }}
        className="bg-gray-50 p-8 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-md"
      >
        <h1 className="text-blue-300 text-xl font-bold mb-4">
          {id ? "Editar Receita" : "Cadastrar Receita"}
        </h1>

        <label className="flex flex-col">
          <span className="font-semibold text-gray-700">Data de Emissão:</span>
          <input
            type="date"
            name="dataEmissao"
            value={form.dataEmissao}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="font-semibold text-gray-700">Medicamento:</span>
          <input
            type="text"
            name="medicamento"
            value={form.medicamento}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="font-semibold text-gray-700">Dosagem:</span>
          <input
            type="text"
            name="dosagem"
            value={form.dosagem}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="font-semibold text-gray-700">Frequência:</span>
          <input
            type="text"
            name="frequencia"
            value={form.frequencia}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="font-semibold text-gray-700">Duração:</span>
          <input
            type="text"
            name="duracao"
            value={form.duracao}
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
            onClick={excluirReceita}
            className="bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition"
          >
            Excluir Receita
          </button>
        )}
      </form>
    </main>
  );
}
