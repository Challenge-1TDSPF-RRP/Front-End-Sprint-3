import Menu from "../Menu/Menu";

export default function Header() {
  return (
    <header className="flex items-center justify-between h-[20vh] bg-blue-400 shadow-md">
      {/* Título à esquerda ocupando toda a altura */}
      <h1 className="flex items-center justify-center bg-blue-500 text-white font-bold text-4xl h-full px-10">
        Saúde+
      </h1>

      {/* Menu à direita */}
      <div className="flex items-center pr-10">
        <Menu />
      </div>
    </header>
  );
}