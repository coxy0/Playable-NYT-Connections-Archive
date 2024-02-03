import "./GameButton.css";

interface Props {
  id: string;
  selected: boolean;
  onMouseDown: () => void;
  children: string;
}

const GameButton = ({ id, selected, onMouseDown, children }: Props) => {
  return (
    <button
      id={id}
      className={`game-btn ${!selected ? "default" : "selected"}`}
      onMouseDown={onMouseDown}
    >
      {children}
    </button>
  );
};

export default GameButton;
