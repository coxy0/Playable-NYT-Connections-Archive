import "./ToolButtonContainer.css";
import { useState } from "react";
import ToolButton from "../../components/ToolButton/ToolButton";

interface Props {
  shuffleFunc: () => void;
  deselectFunc: () => void;
  submitFunc: () => void;
  submitDisabled: boolean;
  resultsMode: boolean;
  resultsFunc: () => void;
}

const ToolButtonContainer = ({
  shuffleFunc,
  deselectFunc,
  submitFunc,
  submitDisabled,
  resultsMode,
  resultsFunc,
}: Props) => {
  const [shuffleTouched, setShuffleTouched] = useState(false);
  const [deselectAllTouched, setDeselectAllTouched] = useState(false);

  return (
    <div id="tool-buttons">
      {!resultsMode ? (
        <>
          <ToolButton
            id="shuffle-button"
            touched={shuffleTouched}
            onMouseDown={() => {
              setShuffleTouched(true);
              shuffleFunc();
            }}
            onMouseUp={() => {
              setShuffleTouched(false);
            }}
          >
            Shuffle
          </ToolButton>
          <ToolButton
            id="deselect-all-button"
            touched={deselectAllTouched}
            onMouseDown={() => {
              setDeselectAllTouched(true);
              deselectFunc();
            }}
            onMouseUp={() => {
              setDeselectAllTouched(false);
            }}
          >
            Deselect All
          </ToolButton>
          <ToolButton
            id="submit-button"
            touched={false}
            onMouseDown={submitFunc}
            onMouseUp={() => {}}
            disabled={submitDisabled}
          >
            Submit
          </ToolButton>
        </>
      ) : (
        <ToolButton
          id="show-results-button"
          touched={false}
          onMouseDown={resultsFunc}
          onMouseUp={() => {}}
        >
          View results
        </ToolButton>
      )}
    </div>
  );
};

export default ToolButtonContainer;
