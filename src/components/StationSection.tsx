import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  station: string;
}

interface StationSectionProps {
  stationName: string;
  items: MenuItem[];
}

export function StationSection({ stationName, items }: StationSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-xl shadow-inset">
      <Button
        variant="ghost"
        className="w-full p-4 justify-between text-left bg-transparent hover:bg-muted/20 rounded-xl"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className="text-lg font-semibold text-foreground">{stationName}</h4>
        {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </Button>
      
      {isExpanded && (
        <div className="px-4 pb-4 space-y-2">
          {items.map((item) => (
            <div 
              key={item.id}
              className="p-3 bg-background rounded-lg shadow-sm"
            >
              <span className="text-foreground font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}