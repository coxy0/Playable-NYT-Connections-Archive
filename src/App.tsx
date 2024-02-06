import { useState } from "react";
import PuzzleData from "./assets/PuzzleData.json";
import Modal from "./components/Modal/Modal";
import GameContainer from "./containers/GameContainer/GameContainer";

const App = () => {
  const [showHelpModal, setShowHelpModal] = useState<boolean>(true);

  const getPuzzle = (
    requiredDate: string
  ): { category: string; connection: string; items: string[] }[] => {
    for (let i = 0; i < PuzzleData.length; i++) {
      const data = PuzzleData[i];
      const date: string = data.date;
      if (date === requiredDate) {
        const answers: {
          category: string;
          connection: string;
          items: string[];
        }[] = data.answers;

        return answers;
      }
    }
    return [];
  };

  const [selectedDate, setSelectedDate] = useState<string>("2023-06-12");
  const [puzzle, setPuzzle] = useState<
    { category: string; connection: string; items: string[] }[]
  >(getPuzzle(selectedDate));

  const [key, setKey] = useState<number>(1);

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSelectedDate = event.target.value;
    setSelectedDate(newSelectedDate);

    const newPuzzle = getPuzzle(newSelectedDate);
    setPuzzle(newPuzzle);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <>
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
      <GameContainer
        key={key}
        puzzle={puzzle}
        handleDropdownChange={handleDropdownChange}
        selectedDate={selectedDate}
      />
    </>
  );
};

export default App;
