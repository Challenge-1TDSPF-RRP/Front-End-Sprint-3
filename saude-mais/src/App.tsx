import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

export default function App() {
  const location = useLocation(); // Obtemos a localização atual da página
  const isLoginPage = location.pathname === '/'; // Verifica se a página atual é a de login

  return (
    <>
      {/* Se não for a página de login, renderiza o Header */}
      {!isLoginPage && <Header />}
      
      {/* Outlet para renderizar o conteúdo das páginas filhas */}
      <Outlet />

      <Footer />
    </>
  );
}
