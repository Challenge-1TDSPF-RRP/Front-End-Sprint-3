import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/tipouser";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<User>();
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      console.log("Dados enviados:", data);

      // Busca usuário pelo CPF
      const res = await fetch(`http://localhost:3001/users?cpf=${data.cpf}`);

      if (!res.ok) throw new Error("Erro na resposta da API");

      const users: User[] = await res.json();
      console.log("Usuários encontrados:", users);

      if (users.length === 0) {
        alert("CPF não encontrado!");
        return;
      }

      const user = users[0];

      localStorage.setItem("usuarioId", String(user.id));

      navigate("/home");
    } catch (error) {
      console.error("Erro ao logar:", error);
      alert("Erro ao tentar logar.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="CPF"
          {...register("cpf", { 
            required: "CPF é obrigatório", 
            pattern: { 
              value: /^\d{11}$/, 
              message: "CPF deve conter 11 dígitos" 
            } 
          })}
        />
        {errors.cpf && <p>{errors.cpf.message}</p>}

        <button type="submit">Entrar</button>
      </form>

      {/* Botão para ir para o cadastro */}
      <button onClick={() => navigate("/register")} style={{ marginTop: "10px" }}>
        Ir para Cadastro
      </button>
    </div>
  );
}
