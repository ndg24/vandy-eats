import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { DateSelector } from "@/components/DateSelector";
import { MealSection } from "@/components/MealSection";
import { useMenuItems } from "@/hooks/useMenuItems";

const DiningHallMenu = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const { menuItems, loading, error } = useMenuItems(formattedDate, id || "");

  if (!id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Dining Hall Not Found</h1>
          <Button onClick={() => navigate('/')} className="rounded-xl">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Remove duplicate menu items by composite key (name, meal, station, dining_hall, date)
  const uniqueMenuItems = Array.from(
    new Map(
      menuItems.map(item => [
        `${item.name}|${item.meal}|${item.station}|${item.dining_hall}|${item.date}`,
        item
      ])
    ).values()
  );

  // Group menu items by meal type
  const mealGroups = uniqueMenuItems.reduce((acc, item) => {
    if (!acc[item.meal]) {
      acc[item.meal] = [];
    }
    acc[item.meal].push({
      id: String(item.id),
      name: item.name,
      station: item.station
    });
    return acc;
  }, {} as Record<string, Array<{ id: string; name: string; station: string }>>);

  const mealOrder = ['breakfast', 'lunch', 'dinner'];
  const mealColorMap = {
    breakfast: 'breakfast',
    lunch: 'lunch',
    dinner: 'dinner'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-xl shadow-card"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                {/* No icon since backend doesn't provide it */} {id.charAt(0).toUpperCase() + id.slice(1)} Dining Hall
              </h1>
              <p className="text-muted-foreground">
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
          </div>
          <DateSelector 
            selectedDate={selectedDate} 
            onDateSelect={setSelectedDate} 
          />
        </div>
      </div>

      {/* Menu Content */}
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">Error: {error}</div>
        ) : menuItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Menu Available</h3>
            <p className="text-muted-foreground">
              Menu information for {format(selectedDate, 'MMMM d')} is not available yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {mealOrder.map((mealType) => {
              const items = mealGroups[mealType];
              if (!items || items.length === 0) return null;
              return (
                <MealSection
                  key={mealType}
                  mealType={mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                  items={items}
                  accentColor={mealColorMap[mealType]}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiningHallMenu;