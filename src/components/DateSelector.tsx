import { Button } from "@/components/ui/button";
import { format, addDays, startOfWeek } from "date-fns";

interface DateSelectorProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function DateSelector({ selectedDate, onDateSelect }: DateSelectorProps) {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start on Monday
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const isSelected = (date: Date) => {
    return format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 px-1">
      {weekDays.map((date) => (
        <Button
          key={date.toISOString()}
          variant={isSelected(date) ? "default" : "secondary"}
          className={`min-w-[80px] rounded-xl transition-all duration-200 ${
            isSelected(date) 
              ? "bg-gradient-primary shadow-card" 
              : "bg-gradient-soft shadow-inset hover:shadow-card"
          }`}
          onClick={() => onDateSelect(date)}
        >
          <div className="text-center">
            <div className="text-xs opacity-75">{format(date, 'EEE')}</div>
            <div className="font-semibold">{format(date, 'd')}</div>
          </div>
        </Button>
      ))}
    </div>
  );
}