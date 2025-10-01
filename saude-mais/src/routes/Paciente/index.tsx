import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/tipouser";

export default function Paciente() {

  useEffect(() => {
    document.title = "Perfil";
  }, []);

  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Partial<User>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) {
      navigate("/");
      return;
    }

    fetch(`http://localhost:3001/users/${usuarioId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setForm(data);
      })
      .catch((err) => console.error(err));
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!user) return;

    try {
      const res = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Erro ao atualizar usuário");

      const updatedUser: User = await res.json();
      setUser(updatedUser);
      setEditMode(false);
      alert("Informações atualizadas com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar informações");
    }
  };

  if (!user) return <p className="text-center mt-10 text-gray-600">Carregando...</p>;

  return (
    <main className="bg-blue-200 h-full w-[100vw] flex justify-center items-center">
      <section className="bg-gray-50 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-300 mb-6 text-center">
          Perfil do Paciente
        </h1>

        {editMode ? (
          <div className="flex flex-col gap-4">
            <input
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              placeholder="Nome"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              name="cpf"
              value={form.cpf || ""}
              onChange={handleChange}
              placeholder="CPF"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              name="birthDate"
              value={form.birthDate || ""}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <select
              name="gender"
              value={form.gender || ""}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
            <input
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
              placeholder="Telefone"
              className="p-2 border border-gray-300 rounded"
            />
            <div className="flex gap-4">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-blue-400 text-white font-bold py-2 rounded hover:bg-blue-500 transition"
              >
                Salvar Alterações
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="flex-1 bg-gray-300 text-gray-700 font-bold py-2 rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 text-gray-700">
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>CPF:</strong> {user.cpf}</p>
            <p><strong>Data de Nascimento:</strong> {user.birthDate}</p>
            <p><strong>Gênero:</strong> {user.gender}</p>
            <p><strong>Telefone:</strong> {user.phone}</p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 bg-blue-400 text-white font-bold py-2 rounded hover:bg-blue-500 transition"
            >
              Editar Informações
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
