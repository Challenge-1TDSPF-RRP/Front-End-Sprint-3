import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/tipouser";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const navigate = useNavigate();

  const onSubmit = (data: User) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.cpf === data.cpf)) {
      alert("CPF já cadastrado!");
      return;
    }

    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Cadastro realizado com sucesso!");
    navigate("/login");
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Nome */}
        <label>Nome</label>
        <input
          {...register("name", { required: "Nome é obrigatório" })}
        />
        {errors.name && <p>{errors.name.message}</p>}

        {/* CPF */}
        <label>CPF</label>
        <input
          {...register("cpf", {
            required: "CPF é obrigatório",
            pattern: {
              value: /^\d{11}$/,
              message: "CPF deve conter 11 dígitos numéricos",
            },
          })}
        />
        {errors.cpf && <p>{errors.cpf.message}</p>}

        {/* Data de nascimento */}
        <label>Data de Nascimento</label>
        <input
          type="date"
          {...register("birthDate", { required: "Data de nascimento é obrigatória" })}
        />
        {errors.birthDate && <p>{errors.birthDate.message}</p>}

        {/* Gênero */}
        <label>Gênero</label>
        <select
          {...register("gender", { required: "Selecione um gênero" })}
        >
          <option value="">Selecione</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}

        {/* Telefone */}
        <label>Telefone</label>
        <input
          {...register("phone", {
            required: "Telefone é obrigatório",
            pattern: {
              value: /^\d{10,13}$/,
              message: "Telefone deve conter entre 10 e 13 números",
            },
          })}
        />
        {errors.phone && <p>{errors.phone.message}</p>}

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Register;
