import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/tipouser";
type LoginData = { cpf: string };

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const navigate = useNavigate();

  const onSubmit = (data: LoginData) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.cpf === data.cpf);

    if (!user) {
      alert("CPF não encontrado!");
      return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(user));
    navigate("/home");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>CPF</label>
        <input
          {...register("cpf", {
            required: "CPF é obrigatório",
            pattern: { value: /^\d{11}$/, message: "CPF deve conter 11 dígitos" },
          })}
        />
        {errors.cpf && <p>{errors.cpf.message}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
