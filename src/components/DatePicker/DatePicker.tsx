import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./DatePicker.css";

const DatePicker = () => {
  const [selected, setSelected] = useState<Date>();
  return (
    <div className="custom-datepicker">
      <DayPicker
        animate
        mode="single"
        selected={selected}
        onSelect={setSelected}
        footer={
          selected
            ? `Selected: ${selected.toLocaleDateString()}`
            : "Pick a day."
        }
      />
    </div>
  );
};

export default DatePicker;
