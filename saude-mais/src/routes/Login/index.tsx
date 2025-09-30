import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/tipouser";


function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<User>();
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      console.log("Dados enviados:", data);  // Verifique se os dados estão sendo enviados

      // Chama a API para verificar o CPF
      const res = await fetch(`http://localhost:3001/users?cpf=${data.cpf}`);

      if (!res.ok) {
        // Se a resposta da API não for ok, lança um erro
        throw new Error("Erro na resposta da API");
      }

      const users: User[] = await res.json();
      console.log("Usuários encontrados:", users);  // Verifique se os usuários estão sendo retornados

      if (users.length === 0) {
        // Se não encontrar nenhum usuário com esse CPF
        alert("CPF não encontrado!");
        return;
      }

      // Se o CPF for encontrado, você pode redirecionar para a página principal
      navigate("/home");  // Ou outra página após o login

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

export default Login;
