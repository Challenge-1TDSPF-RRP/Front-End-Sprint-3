import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/tipouser";
import { useEffect } from "react";

export default function Register() {

  useEffect(() => {
      document.title = "Cadastro";
    }, []);
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      const res = await fetch(`http://localhost:3001/users?cpf=${data.cpf}`);
      const existingUsers: User[] = await res.json();

      if (existingUsers.length > 0) {
        alert("CPF já cadastrado!");
        return;
      }

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

      const newUser: User = await createRes.json();
      localStorage.setItem("usuarioId", String(newUser.id));

      alert("Cadastro realizado com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <main className="flex bg-blue-200 w-[100vw] h-[90vh] justify-center items-center">
      <div className="flex flex-col bg-gray-50 rounded w-[50vw] p-10 items-center">
        <h2 className="text-blue-400 font-bold text-2xl mb-6">Cadastro</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          {/* Nome */}
          <label className="flex flex-col text-blue-300 font-bold">
            Nome:
            <input
              className="bg-blue-100 p-2 rounded text-blue-400 font-bold"
              placeholder="Digite seu nome"
              {...register("name", { required: "Nome é obrigatório" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </label>

          {/* CPF */}
          <label className="flex flex-col text-blue-300 font-bold">
            CPF:
            <input
              className="bg-blue-100 p-2 rounded text-blue-400 font-bold"
              placeholder="CPF"
              {...register("cpf", {
                required: "CPF é obrigatório",
                pattern: {
                  value: /^\d{11}$/,
                  message: "CPF deve conter 11 dígitos",
                },
              })}
            />
            {errors.cpf && (
              <p className="text-red-500 text-sm">{errors.cpf.message}</p>
            )}
          </label>

          {/* Data de Nascimento */}
          <label className="flex flex-col text-blue-300 font-bold">
            Data de nascimento:
            <input
              type="date"
              className="bg-blue-100 p-2 rounded text-blue-400 font-bold"
              {...register("birthDate", {
                required: "Data de nascimento é obrigatória",
              })}
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm">
                {errors.birthDate.message}
              </p>
            )}
          </label>

          {/* Gênero */}
          <label className="flex flex-col text-blue-300 font-bold">
            Gênero:
            <select
              className="bg-blue-100 p-2 rounded text-blue-400 font-bold"
              {...register("gender", { required: "Selecione um gênero" })}
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </label>

          {/* Telefone */}
          <label className="flex flex-col text-blue-300 font-bold">
            Telefone:
            <input
              className="bg-blue-100 p-2 rounded text-blue-400 font-bold"
              placeholder="Telefone"
              {...register("phone", {
                required: "Telefone é obrigatório",
                pattern: {
                  value: /^\d{10,13}$/,
                  message: "Telefone deve conter entre 10 e 13 números",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </label>

          {/* Botão cadastrar */}
          <button
            type="submit"
            className="bg-blue-400 text-white font-bold py-2 rounded hover:bg-blue-500 transition"
          >
            Cadastrar
          </button>
        </form>

        {/* Botão voltar */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-400 hover:underline"
        >
          Ir para Login
        </button>
      </div>
    </main>
  );
}