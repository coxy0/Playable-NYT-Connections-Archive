import "./ToolButton.css";

interface Props {
  id: string;
  touched: boolean;
  onMouseDown: () => void;
  onMouseUp: () => void;
  children: string;
  disabled?: boolean;
}

const ToolButton = ({
  id,
  touched,
  onMouseDown,
  onMouseUp,
  children,
  disabled,
}: Props) => {
  return (
    <button
      id={id}
      className={`tool-btn${!touched ? "" : " touched"}${
        !disabled ? "" : " inactive"
      }`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ToolButton;
