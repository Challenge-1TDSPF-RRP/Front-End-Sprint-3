import { Link } from "react-router-dom";

export default function Menu(){

    return(
        <nav>
            <Link to="/home">Home</Link>| 
            <Link to="/consultas">Consultas</Link>
            <Link to="/exames">Exames</Link>
            <Link to="/receitas">Receitas</Link>
            <Link to="/faq">Faq</Link>
            <Link to="/paciente">Perfil</Link>
            <Link to="/integrantes">Integrantes</Link>
            <Link to="/contatos">Contatos</Link>
        </nav>
    );
}