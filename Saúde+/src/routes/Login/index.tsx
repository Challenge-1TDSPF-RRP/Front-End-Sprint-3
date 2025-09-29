import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/tipouser";

type LoginData = { cpf: string };

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await fetch(`http://localhost:3001/users?cpf=${data.cpf}`);
      const users: User[] = await res.json();

      if (users.length === 0) {
        alert("CPF não encontrado!");
        return;
      }
      
    } catch (error) {
      console.error(error);
      alert("Erro ao tentar logar.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="CPF"
          {...register("cpf", { required: "CPF é obrigatório", pattern: { value: /^\d{11}$/, message: "CPF deve conter 11 dígitos" } })}
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

export default Login;
