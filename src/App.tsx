import GameContainer from "./containers/GameContainer/GameContainer";

const App = () => {
  const puzzle: { topic: string; words: string[]; difficulty: number }[] = [
    {
      topic: "COLOUR",
      words: ["BLUE", "GREEN", "RED", "YELLOW"],
      difficulty: 0,
    },
    {
      topic: "KITCHEN UTENSILS",
      words: ["FORK", "KNIFE", "SPATULA", "SPOON"],
      difficulty: 1,
    },
    {
      topic: "COMPUTER STUFF",
      words: ["CABLE", "KEYBOARD", "MONITOR", "MOUSE"],
      difficulty: 2,
    },
    {
      topic: "NATURE",
      words: ["BUSH", "FLOWER", "PLANT", "TREE"],
      difficulty: 3,
    },
  ];

  return (
    <>
      <GameContainer puzzle={puzzle} />
    </>
  );
};

export default App;
