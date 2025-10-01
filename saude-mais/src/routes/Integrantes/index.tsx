import { useEffect } from "react";
import ryan from "../../img/ryan.svg";
import raul from "../../img/raul.svg";
import pietro from "../../img/pietro.svg";

export default function Integrantes() {
  useEffect(() => {
    document.title = "Integrantes";
  }, []);

  return (
    <main>
      <section>
        <h2>Integrantes</h2>
        <div>
          <img src={pietro} alt="pietro" />
          <div>
            <h3>Pietro Donella</h3>
            <ul>
              <li>RM: 561722</li>
              <li>Turma: 1TDSPF</li>
              <li>Github: PietroDonella</li>
              <li>Linkedin: Pietro Donella Salomão</li>
            </ul>
          </div>
        </div>
        <div>
          <img src={raul} alt="raul" />
          <div>
            <h3>Raul Rezende</h3>
            <ul id="lista-integrantes">
              <li>RM: 564002</li>
              <li>Turma: 1TDSPF</li>
              <li>Github: Raul-Rezende</li>
              <li>Linkedin: Raul Rezende Lemini Agular</li>
            </ul>
          </div>
        </div>
        <div>
          <img src={ryan} alt="ryan" />
          <div>
            <h3>Ryan Vetoriano</h3>
            <ul id="lista-integrantes">
              <li>RM: 565667</li>
              <li>Turma: 1TDSPF</li>
              <li>Github: ryanvetoriano</li>
              <li>Linkedin: Ryan Vetoriano</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
