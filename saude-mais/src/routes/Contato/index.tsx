import telefone from "../../img/telefone.svg";
import wpp from "../../img/whatsapp.svg";
import logo from "../../img/logohc.png";
import facebook from "../../img/facebook.svg";
import youtube from "../../img/youtube.svg";
import instagram from "../../img/instagram.svg";
import x from "../../img/x.svg";
import linkedin from "../../img/linkedin.svg";

export default function Contato() {
  return (
    <main className="bg-blue-200 h-[80vh] w-[100vw] flex justify-center items-center py-10 px-4">
      <section className="bg-gray-50 p-8 rounded-lg shadow-md h-[60vh] max-w-3xl flex flex-col gap-8">
        {/* Contato do time */}
        <div>
          <h2 className="text-2xl font-bold text-blue-300 mb-4">
            Nossos Contatos
          </h2>
          <h3 className="font-semibold text-blue-300 mb-2">
            Contate o nosso time:
          </h3>
          <p className="text-gray-600 bg-blue-200 rounded shadow-md p-1">
            rm565667@fiap.com.br - rm561722@fiap.com.br - rm564002@fiap.com.br
          </p>
        </div>

        {/* Contato do HC */}
        <div>
          <h2 className="text-2xl font-bold text-blue-300 mb-4">
            Contatos do HC
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4">
            <div className="flex items-center gap-2 bg-blue-200 rounded shadow-md p-2">
              <img src={telefone} alt="telefone" className="w-6 h-6" />
              <p className="text-gray-600">(11) 2661-0000</p>
            </div>
            <div className="flex items-center gap-2 bg-blue-200 rounded shadow-md p-2">
              <img src={wpp} alt="whatsapp" className="w-6 h-6" />
              <p className="text-gray-600">(81) 2126-3757</p>
            </div>
            <a
              href="https://www.hc.fm.usp.br/hc/portal/"
              className="flex items-center gap-2 text-gray-600 bg-blue-200 rounded shadow-md p-2"
            >
              <img src={logo} alt="link" className="w-12 h-6" />
              Site do HC
            </a>
          </div>
        </div>

        {/* Redes sociais */}
        <div>
          <h2 className="text-2xl font-bold text-blue-300 mb-4">
            Redes Sociais
          </h2>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/hospitaldasclinicasdafmusp"
              className="hover:scale-110 transition"
            >
              <img src={facebook} alt="facebook" className="w-8 h-8" />
            </a>
            <a
              href="https://www.instagram.com/hospitalhcfmusp/"
              className="hover:scale-110 transition"
            >
              <img src={instagram} alt="instagram" className="w-8 h-8" />
            </a>
            <a
              href="https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2F11393332%2Fadmin%2F"
              className="hover:scale-110 transition"
            >
              <img src={linkedin} alt="linkedin" className="w-8 h-8" />
            </a>
            <a
              href="https://x.com/hospitalHCFMUSP"
              className="hover:scale-110 transition"
            >
              <img src={x} alt="x" className="w-8 h-8" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC_DUjcI35Hm0ix74KDQ67Jw/featured"
              className="hover:scale-110 transition"
            >
              <img src={youtube} alt="youtube" className="w-8 h-8" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
