import { Link } from "react-router-dom";

export default function Menu(){

    return(
        <nav>
            <Link to="/home">Home </Link>| 
            <Link to="/consultas"> Consultas</Link>
        </nav>
    );
}