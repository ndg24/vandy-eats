import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { StationSection } from "./StationSection";

interface MenuItem {
  id: string;
  name: string;
  station: string;
}

interface MealSectionProps {
  mealType: string;
  items: MenuItem[];
  accentColor: string;
}

export function MealSection({ mealType, items, accentColor }: MealSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Group items by station
  const stationGroups = items.reduce((acc, item) => {
    if (!acc[item.station]) {
      acc[item.station] = [];
    }
    acc[item.station].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const getAccentClass = () => {
    switch (accentColor) {
      case 'breakfast': return 'from-breakfast to-orange-300';
      case 'lunch': return 'from-lunch to-green-300';
      case 'dinner': return 'from-dinner to-purple-300';
      default: return 'from-primary to-yellow-300';
    }
  };

  return (
    <Card className="mb-4 shadow-card border-0 overflow-hidden">
      <Button
        variant="ghost"
        className="w-full p-6 justify-between text-left bg-transparent hover:bg-transparent"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-8 rounded-full bg-gradient-to-b ${getAccentClass()}`} />
          <h3 className="text-2xl font-bold text-foreground">{mealType}</h3>
        </div>
        {isExpanded ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
      </Button>
      
      {isExpanded && (
        <div className="px-6 pb-6 space-y-4">
          {Object.entries(stationGroups).map(([station, stationItems]) => (
            <StationSection
              key={station}
              stationName={station}
              items={stationItems}
            />
          ))}
        </div>
      )}
    </Card>
  );
}