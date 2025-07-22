import { DiningHallCard } from "@/components/DiningHallCard";
import { diningHalls } from "@/data/mockData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Vanderbilt Dining</h1>
        </div>
        
        <div className="space-y-4 max-w-md mx-auto">
          {diningHalls.map((hall) => (
            <DiningHallCard
              key={hall.id}
              id={hall.id}
              name={hall.name}
              icon={hall.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
