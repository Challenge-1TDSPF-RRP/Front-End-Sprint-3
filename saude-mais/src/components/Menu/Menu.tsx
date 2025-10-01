import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="flex justify-center gap-1 rounded">
      <Link
        to="/home"
        className="bg-blue-400 text-white px-1 py-2 rounded font-bold hover:bg-blue-500 transition"
      >
        Home
      </Link>
      <Link
        to="/consultas"
        className="bg-blue-400 text-white px-1 py-2 rounded font-bold hover:bg-blue-500 transition"
      >
        Consultas
      </Link>
      <Link
        to="/exames"
        className="bg-blue-400 text-white px-1 py-2 rounded font-bold hover:bg-blue-500 transition"
      >
        Exames
      </Link>
      <Link
        to="/receitas"
        className="bg-blue-400 text-white px-1 py-2 rounded font-bold hover:bg-blue-500 transition"
      >
        Receitas
      </Link>
      <Link
        to="/faq"
        className="bg-blue-400 text-white px-1 py-2 rounded font-bold hover:bg-blue-500 transition"
      >
        Faq
      </Link>
      <Link
        to="/paciente"
        className="bg-blue-400 text-white px-1 py-2 rounded font-bold hover:bg-blue-500 transition"
      >
        Perfil
      </Link>
      <Link
        to="/integrantes"
        className="bg-blue-400 text-white px-1 py-2 rounded font-bold hover:bg-blue-500 transition"
      >
        Integrantes
      </Link>
      <Link
        to="/contatos"
        className="bg-blue-400 text-white px-1 py-2 rounded font-bold hover:bg-blue-500 transition"
      >
        Contatos
      </Link>
      <Link
        to="/sobre"
        className="bg-blue-400 text-white px-1 py-2 rounded font-bold hover:bg-blue-500 transition"
      >
        Sobre
      </Link>
    </nav>
  );
}
