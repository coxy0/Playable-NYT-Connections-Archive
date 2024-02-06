import "./Dropdown.css";

interface Props {
  dates: string[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedDate: string;
}

const Dropdown = ({ dates, selectedDate, handleChange }: Props) => {
  const formatDate = (inputDate: string): string => {
    const parsedDate = new Date(inputDate);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date");
    }

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  return (
    <div className="dates-dropdown">
      <span id="select-text">Select game date:</span>
      <select
        name="dates"
        id="dates"
        onChange={handleChange}
        value={selectedDate}
      >
        {dates.map((date, index) => (
          <option key={index} value={date}>
            {formatDate(date)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
