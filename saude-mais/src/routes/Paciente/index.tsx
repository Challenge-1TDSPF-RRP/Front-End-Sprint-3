import { useEffect, useState } from "react";
import type { User } from "../../types/tipouser";

export default function Paciente() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) return;

    fetch(`http://localhost:3001/users/${usuarioId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }, []);

  if (!user) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Perfil do Paciente</h1>
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>CPF:</strong> {user.cpf}</p>
      <p><strong>Data de Nascimento:</strong> {user.birthDate}</p>
      <p><strong>Gênero:</strong> {user.gender}</p>
      <p><strong>Telefone:</strong> {user.phone}</p>
    </div>
  );
}
