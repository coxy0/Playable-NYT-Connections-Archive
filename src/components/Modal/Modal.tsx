import "./Modal.css";
import { ReactNode, useState } from "react";

interface Props {
  id: string;
  visible: boolean;
  onClickClose: () => void;
  children: ReactNode;
}

const Modal = ({ id, visible, onClickClose, children }: Props) => {
  const [closing, setClosing] = useState<boolean>(false);

  const handleClickClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
    }, 200);
    onClickClose();
  };

  return (
    <div
      id={id}
      className={`modal ${
        closing ? "closing" : `${visible ? "visible" : "hidden"}`
      }`}
    >
      <div className="modal-content">
        <button
          id="close-help"
          className="close-x"
          onMouseDown={handleClickClose}
        ></button>
        <div id="inner-help">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
