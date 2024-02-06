import "./GameButtonContainer.css";
import AnswerBanner from "../../components/AnswerBanner/AnswerBanner";

interface Props {
  buttonComponents: JSX.Element[];
  correctGuesses: { category: string; connection: string; items: string[] }[];
}

const GameButtonContainer = ({ buttonComponents, correctGuesses }: Props) => {
  return (
    <div id="board">
      {correctGuesses.length > 0 &&
        Array.from({ length: correctGuesses.length }).map((_, index) => {
          const game = correctGuesses[index];
          const difficulty = ["yellow", "green", "blue", "purple"].indexOf(
            game.category
          );
          return (
            <AnswerBanner
              key={index}
              topic={game.connection}
              words={game.items}
              difficulty={difficulty}
            />
          );
        })}
      {buttonComponents}
    </div>
  );
};

export default GameButtonContainer;
