import "./MistakesBubble.css";

interface Props {
  id: string;
  lost: boolean;
}

const MistakesBubble = ({ id, lost }: Props) => {
  return <span id={id} className={`bubble${lost ? "" : " lost"}`}></span>;
};

export default MistakesBubble;
