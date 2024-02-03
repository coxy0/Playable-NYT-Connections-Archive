import "./AnswerBanner.css";

interface Props {
  topic: string;
  words: string[];
  difficulty: number;
}

const AnswerBanner = ({ topic, words, difficulty }: Props) => {
  return (
    <div className={`answer-banner group-${difficulty}`}>
      <p>
        <span>{topic}</span>
        <br />
        {words.join(", ")}
      </p>
    </div>
  );
};

export default AnswerBanner;
