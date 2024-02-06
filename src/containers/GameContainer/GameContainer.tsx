import "./GameContainer.css";
import { useEffect, useState } from "react";
import GameButton from "../../components/GameButton/GameButton";
import GameButtonContainer from "../GameButtonContainer/GameButtonContainer";
import MistakesBubbleContainer from "../MistakesBubbleContainer/MistakesBubbleContainer";
import ToolButtonContainer from "../ToolButtonContainer/ToolButtonContainer";
import Toast from "../../components/Toast/Toast";
import PuzzleData from "../../assets/PuzzleData.json";
import Dropdown from "../../components/Dropdown/Dropdown";
import Modal from "../../components/Modal/Modal";

interface Props {
  puzzle: { category: string; connection: string; items: string[] }[];
  handleDropdownChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedDate: string;
}

const GameContainer = ({
  puzzle,
  handleDropdownChange,
  selectedDate,
}: Props) => {
  const [buttons, setButtons] = useState<JSX.Element[]>([]);
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const getShuffledArray = (arr: any[]) => {
    const arrCopy = arr.slice();

    for (let i = arrCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
    }

    return arrCopy;
  };

  const getWord = (index: number): string => {
    const topicNum = Math.floor(index / 4);
    const wordNum = index % 4;
    return puzzle[topicNum].items[wordNum];
  };

  useEffect(() => {
    let orderOfIDs: number[] = [];
    if (!buttons.length && correctGuesses.length < 4) {
      orderOfIDs = getShuffledArray(
        Array.from({ length: 16 }, (_, index) => index)
      );
    } else {
      for (let button of buttons) {
        const buttonKey = button.key;
        if (buttonKey !== null) {
          const numericButtonKey = parseInt(buttonKey);
          orderOfIDs.push(numericButtonKey);
        }
      }
    }

    setButtons(
      orderOfIDs.map((index, _) => (
        <GameButton
          key={index}
          id={`item-${index}`}
          selected={selectedButtons.includes(index)}
          onMouseDown={() => {
            setSelectedButtons((prevSelectedButtons) => {
              if (prevSelectedButtons.includes(index)) {
                setSubmitDisabled(true);
                return prevSelectedButtons.filter(
                  (selectedIndex) => selectedIndex !== index
                );
              } else if (prevSelectedButtons.length < 4) {
                if (selectedButtons.length === 3) {
                  setSubmitDisabled(false);
                }
                return [...prevSelectedButtons, index];
              }
              return prevSelectedButtons;
            });
          }}
        >
          {getWord(index)}
        </GameButton>
      ))
    );
  }, [selectedButtons]);

  const shuffleGameButtons = () => {
    const shuffledButtons = getShuffledArray(buttons);
    setButtons(shuffledButtons);
  };
  const deselectAllGameButtons = () => {
    setSelectedButtons([]);
    setSubmitDisabled(true);
  };

  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [guessColours, setGuessColours] = useState<string[][]>([]);
  const [correctGuesses, setCorrectGuesses] = useState<
    { category: string; connection: string; items: string[] }[]
  >([]);
  const [mistakeBubblesVisible, setMistakeBubblesVisible] = useState<number>(4);

  const wordsToColours = (words: string[]): string[] => {
    const colours: string[] = [];
    for (let word of words) {
      for (let connection of puzzle) {
        const words = connection.items;
        if (words.includes(word)) {
          const colour = connection.category;
          colours.push(colour);
        }
      }
    }
    return colours;
  };

  const submitGuess = () => {
    if (mistakeBubblesVisible > 0) {
      const selectedWords: string[] = [];
      selectedButtons.forEach((key) => {
        selectedWords.push(getWord(key));
      });
      selectedWords.sort((a, b) => a.localeCompare(b));

      const guessedWordsColours = wordsToColours(selectedWords);
      setGuessColours((prevGuessColours) => [
        ...prevGuessColours,
        guessedWordsColours,
      ]);

      for (let i = 0; i < 4; i++) {
        const connection = puzzle[i];
        const words = connection.items;

        const isEqual = selectedWords.every(
          (value, index) => value === words[index]
        );
        if (isEqual) {
          const revisedButtons = buttons.filter((button) => {
            const buttonKey = button.key;
            if (buttonKey !== null) {
              const numericButtonKey = parseInt(buttonKey);
              return !selectedButtons.includes(numericButtonKey);
            }
            return false;
          });

          setButtons(revisedButtons);
          setCorrectGuesses([...correctGuesses, connection]);
          deselectAllGameButtons();
          return;
        }

        const oneAway =
          selectedWords.filter((word) => words.includes(word)).length === 3;
        if (oneAway) {
          setMistakeBubblesVisible(mistakeBubblesVisible - 1);
          toastAnimation("One away");
          return;
        }
      }

      setMistakeBubblesVisible(mistakeBubblesVisible - 1);
      if (mistakeBubblesVisible > 0) {
        toastAnimation("Incorrect");
      }
    }
  };

  useEffect(() => {
    if (mistakeBubblesVisible === 0) {
      deselectAllGameButtons();
      toastAnimation("Better luck next time");

      const categoriesNotGuessed = puzzle.filter(
        (connection) => !correctGuesses.includes(connection)
      );
      setTimeout(() => {
        setButtons([]);
        setCorrectGuesses([...correctGuesses, ...categoriesNotGuessed]);
      }, 1500);
    }
  }, [mistakeBubblesVisible]);

  const [toastText, setToastText] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const toastAnimation = (text: string) => {
    setToastText(text);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const getAvailableDates = (): string[] => {
    const dates: string[] = [];
    for (let i = 0; i < PuzzleData.length; i++) {
      const data = PuzzleData[i];
      const date: string = data.date;
      dates.push(date);
    }
    return dates;
  };

  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const [showResultsModal, setShowResultsModal] = useState<boolean>(false);

  useEffect(() => {
    if (correctGuesses.length === 4) {
      setTimeout(() => {
        setGameEnd(true);
        setShowResultsModal(true);
      }, 1000);
    }
  }, [correctGuesses]);

  return (
    <div id="game">
      <div id="top-text">
        <span>Create four groups of four!</span>
      </div>
      <GameButtonContainer
        buttonComponents={buttons}
        correctGuesses={correctGuesses}
      />
      <div id="mistakes-remaining">
        <span id="mistakes-remaining-text">Mistakes remaining:</span>
        <MistakesBubbleContainer bubblesVisible={mistakeBubblesVisible} />
      </div>
      <ToolButtonContainer
        shuffleFunc={shuffleGameButtons}
        deselectFunc={deselectAllGameButtons}
        submitFunc={submitGuess}
        submitDisabled={submitDisabled}
        resultsMode={gameEnd}
        resultsFunc={() => setShowResultsModal(true)}
      />
      <Toast visible={showToast}>{toastText}</Toast>
      <Dropdown
        dates={getAvailableDates()}
        handleChange={handleDropdownChange}
        selectedDate={selectedDate}
      ></Dropdown>
      <Modal
        id="results-modal"
        visible={showResultsModal}
        onClickClose={() => setShowResultsModal(false)}
      >
        <h2 id="congrats-title">Congrats!</h2>
        <div id="puzzle-title">Connections {selectedDate}</div>
        <div id="emoji-recap">
          {Array.from({ length: guessColours.length }).map((_, rowIndex) => (
            <div key={rowIndex} className="results-emoji-row">
              {Array.from({ length: 4 }).map((_, columnIndex) => (
                <div
                  key={columnIndex}
                  className={`results-emoji group-${[
                    "yellow",
                    "green",
                    "blue",
                    "purple",
                  ].indexOf(guessColours[rowIndex][columnIndex])}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default GameContainer;
