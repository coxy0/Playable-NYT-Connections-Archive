import "./Toast.css";

interface Props {
  visible: boolean;
  children: string;
}

const Toast = ({ visible, children }: Props) => {
  return (
    <div className={`toast${!visible ? "" : " show"}`}>
      <span id="toast-contents">{children}</span>
    </div>
  );
};

export default Toast;
