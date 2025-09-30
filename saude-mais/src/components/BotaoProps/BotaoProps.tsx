type BotaoProps = {
  texto: string;
  onClick: () => void;
  cor?: string;
};

export default function Botao({ texto, onClick, cor = "Gray" }: BotaoProps) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: cor,
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "4px",
        marginTop: "10px"
      }}
    >
      {texto}
    </button>
  );
}
