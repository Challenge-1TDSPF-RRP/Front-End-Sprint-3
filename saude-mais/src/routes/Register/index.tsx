import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/tipouser";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      // Verifica se o CPF já existe
      const res = await fetch(`http://localhost:3001/users?cpf=${data.cpf}`);
      const existingUsers: User[] = await res.json();

      if (existingUsers.length > 0) {
        alert("CPF já cadastrado!");
        return;
      }

      // Cria o novo usuário (sem passar 'id' para garantir numérico)
      const createRes = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          cpf: data.cpf,
          birthDate: data.birthDate,
          gender: data.gender,
          phone: data.phone,
        }),
      });

      // Recebe o usuário criado (JSON Server adiciona id numérico automaticamente)
      const newUser: User = await createRes.json();

      // 🔹 Salva o ID do usuário logado no localStorage
      localStorage.setItem("usuarioId", String(newUser.id));

      alert("Cadastro realizado com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <main>
      <h2>Cadastro</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Nome:
            <input
              placeholder="Nome"
              {...register("name", { required: "Nome é obrigatório" })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </label>

          <label>
            Cpf:
            <input
              placeholder="CPF"
              {...register("cpf", {
                required: "CPF é obrigatório",
                pattern: {
                  value: /^\d{11}$/,
                  message: "CPF deve conter 11 dígitos",
                },
              })}
            />
            {errors.cpf && <p>{errors.cpf.message}</p>}
          </label>

          <label>
            Data de nascimento:
            <input
              type="date"
              {...register("birthDate", {
                required: "Data de nascimento é obrigatória",
              })}
            />
            {errors.birthDate && <p>{errors.birthDate.message}</p>}
          </label>

          <label>
            Gênero:
            <select
              {...register("gender", { required: "Selecione um gênero" })}
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
            {errors.gender && <p>{errors.gender.message}</p>}
          </label>

          <label>
            Telefone:
            <input
              placeholder="Telefone"
              {...register("phone", {
                required: "Telefone é obrigatório",
                pattern: {
                  value: /^\d{10,13}$/,
                  message: "Telefone deve conter entre 10 e 13 números",
                },
              })}
            />
            {errors.phone && <p>{errors.phone.message}</p>}
          </label>

          <button type="submit">Cadastrar</button>
        </form>

        <button onClick={() => navigate("/")} style={{ marginTop: "10px" }}>
          Ir para Login
        </button>
      </div>
    </main>
  );
}
