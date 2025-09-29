import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Home from "./routes/Home";

export default function App() {

  return(
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )

}