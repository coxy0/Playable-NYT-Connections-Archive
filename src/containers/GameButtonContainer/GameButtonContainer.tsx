import "./GameButtonContainer.css";
import AnswerBanner from "../../components/AnswerBanner/AnswerBanner";

interface Props {
  buttonComponents: JSX.Element[];
  correctGuesses: { topic: string; words: string[]; difficulty: number }[];
}

const GameButtonContainer = ({ buttonComponents, correctGuesses }: Props) => {
  return (
    <div id="board">
      {correctGuesses.length > 0 &&
        Array.from({ length: correctGuesses.length }).map((_, index) => {
          const category = correctGuesses[index];
          return (
            <AnswerBanner
              key={index}
              topic={category.topic}
              words={category.words}
              difficulty={category.difficulty}
            />
          );
        })}
      {buttonComponents}
    </div>
  );
};

export default GameButtonContainer;
