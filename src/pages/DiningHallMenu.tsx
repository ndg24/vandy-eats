import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { DateSelector } from "@/components/DateSelector";
import { MealSection } from "@/components/MealSection";
import { getDiningHallById, getMenuForDiningHall } from "@/data/mockData";

const DiningHallMenu = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const diningHall = getDiningHallById(id || '');
  const menuItems = getMenuForDiningHall(id || '', format(selectedDate, 'yyyy-MM-dd'));

  if (!diningHall) {
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

  // Group menu items by meal type
  const mealGroups = menuItems.reduce((acc, item) => {
    if (!acc[item.mealType]) {
      acc[item.mealType] = [];
    }
    acc[item.mealType].push({
      id: item.id,
      name: item.itemName,
      station: item.station
    });
    return acc;
  }, {} as Record<string, Array<{ id: string; name: string; station: string }>>);

  const mealOrder = ['Breakfast', 'Lunch', 'Dinner'];
  const mealColorMap = {
    'Breakfast': 'breakfast',
    'Lunch': 'lunch',
    'Dinner': 'dinner'
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
                {diningHall.icon} {diningHall.name}
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
        {menuItems.length === 0 ? (
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
                  mealType={mealType}
                  items={items}
                  accentColor={mealColorMap[mealType as keyof typeof mealColorMap]}
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