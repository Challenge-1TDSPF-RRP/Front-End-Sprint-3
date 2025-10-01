import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/tipouser";

export default function Paciente() {
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

  if (!user) return <p>Carregando...</p>;

  return (
    <main>
      <h1>Perfil do Paciente</h1>

      {editMode ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "400px",
          }}
        >
          <input
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            placeholder="Nome"
          />
          <input
            name="cpf"
            value={form.cpf || ""}
            onChange={handleChange}
            placeholder="CPF"
          />
          <input
            type="date"
            name="birthDate"
            value={form.birthDate || ""}
            onChange={handleChange}
          />
          <select
            name="gender"
            value={form.gender || ""}
            onChange={handleChange}
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
          />
          <button onClick={handleUpdate}>Salvar Alterações</button>
          <button onClick={() => setEditMode(false)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Nome:</strong> {user.name}
          </p>
          <p>
            <strong>CPF:</strong> {user.cpf}
          </p>
          <p>
            <strong>Data de Nascimento:</strong> {user.birthDate}
          </p>
          <p>
            <strong>Gênero:</strong> {user.gender}
          </p>
          <p>
            <strong>Telefone:</strong> {user.phone}
          </p>
          <button onClick={() => setEditMode(true)}>Editar Informações</button>
        </div>
      )}
    </main>
  );
}
