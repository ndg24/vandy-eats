import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface DiningHallCardProps {
  name: string;
  id: string;
}

export function DiningHallCard({ name, id }: DiningHallCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dining-hall/${id}`);
  };

  return (
    <Card 
      className="p-6 shadow-card hover:shadow-soft transition-all duration-300 cursor-pointer transform hover:scale-[1.02] border-0 flex flex-col items-center justify-center text-center"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center gap-4 w-full">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{name}</h3>
        </div>
      </div>
    </Card>
  );
}