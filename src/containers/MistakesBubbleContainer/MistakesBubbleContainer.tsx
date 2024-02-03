import "./MistakesBubbleContainer.css";
import MistakesBubble from "../../components/MistakesBubble/MistakesBubble";

interface Props {
  bubblesVisible: number;
}

const MistakesBubbleContainer = ({ bubblesVisible }: Props) => {
  return (
    <div id="mistakes-remaining-bubbles">
      {Array.from({ length: 4 }, (_, index) => (
        <MistakesBubble
          key={index}
          id={`bubble-${index}`}
          lost={index < bubblesVisible}
        />
      ))}
    </div>
  );
};

export default MistakesBubbleContainer;
