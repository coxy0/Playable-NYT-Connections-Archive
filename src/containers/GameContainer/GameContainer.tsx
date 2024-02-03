import "./GameContainer.css";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import GameButton from "../../components/GameButton/GameButton";
import GameButtonContainer from "../GameButtonContainer/GameButtonContainer";
import MistakesBubbleContainer from "../MistakesBubbleContainer/MistakesBubbleContainer";
import ToolButtonContainer from "../ToolButtonContainer/ToolButtonContainer";

interface Props {
  puzzle: { topic: string; words: string[]; difficulty: number }[];
}

const GameContainer = ({ puzzle }: Props) => {
  const [showHelpModal, setShowHelpModal] = useState<boolean>(true);

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
    return puzzle[topicNum].words[wordNum];
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
  const [correctGuesses, setCorrectGuesses] = useState<
    { topic: string; words: string[]; difficulty: number }[]
  >([]);
  const [mistakeBubblesVisible, setMistakeBubblesVisible] = useState<number>(4);

  const submitGuess = () => {
    if (mistakeBubblesVisible > 0) {
      const selectedWords: string[] = [];
      selectedButtons.forEach((key) => {
        selectedWords.push(getWord(key));
      });
      selectedWords.sort((a, b) => a.localeCompare(b));

      for (let i = 0; i < 4; i++) {
        const category = puzzle[i];
        const words = category.words;

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
          setCorrectGuesses([...correctGuesses, category]);
          deselectAllGameButtons();
          return;
        }
      }
      setMistakeBubblesVisible(mistakeBubblesVisible - 1);
    }
  };

  return (
    <div id="game">
      <Modal
        id="help-modal"
        visible={showHelpModal}
        onClickClose={() => setShowHelpModal(false)}
      >
        <h2>How to play Connections</h2>
        <p className="modal-subtitle">
          Find groups of four items that share something in common.
        </p>
        <ul>
          <li>
            Select four items and tap 'Submit' to check if your guess is
            correct.
          </li>
          <li>Find the groups without making 4 mistakes!</li>
        </ul>
        <p className="modal-subtitle">Category Examples</p>
        <ul>
          <li>FISH: Bass, Flounder, Salmon, Trout</li>
          <li>FIRE ___: Ant, Drill, Island, Opal</li>
        </ul>
        <p>
          Categories will always be more specific than "5-LETTER WORDS", "NAMES"
          or "VERBS."
        </p>
        <p>
          Each puzzle has exactly one solution. Watch out for words that seem to
          belong to multiple categories!
        </p>
        <div id="colour-descriptions">
          <p>
            Each group is assigned a colour, which will be revealed as you
            solve:
          </p>
          <div>
            <ul className="help-emojis">
              <img
                id="help-arrow"
                src="https://www.nytimes.com/games-assets/v2/metadata/help_arrow.svg"
                alt="levels description arrow"
              ></img>
              <div className="emoji-row">
                <span className="help-emoji group-0"></span> Straightforward
              </div>
              <div className="emoji-row">
                <span className="help-emoji group-1"></span>
              </div>
              <div className="emoji-row">
                <span className="help-emoji group-2"></span>
              </div>
              <div className="emoji-row">
                <span className="help-emoji group-3"></span>Tricky
              </div>
            </ul>
          </div>
        </div>
      </Modal>
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
      />
    </div>
  );
};

export default GameContainer;
