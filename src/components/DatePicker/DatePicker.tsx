import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./DatePicker.css";
import { Popover, Button } from "@radix-ui/themes";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";

const DatePicker = () => {
  const [selected, setSelected] = useState<Date>();
  return (
    <div className="custom-datepicker">
      <Popover.Root>
        <Popover.Trigger>
          <Button
            variant="outline"
            data-empty={!selected}
            className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
          >
            {selected ? format(selected, "PPP") : <span>Pick a date</span>}
            <ChevronDownIcon />
          </Button>
        </Popover.Trigger>
        <Popover.Content className="w-auto p-0" align="start">
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
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};

export default DatePicker;
