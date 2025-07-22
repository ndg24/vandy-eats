import { DiningHallCard } from "@/components/DiningHallCard";
import { useDiningHalls } from "@/hooks/useDiningHalls";

const Index = () => {
  const { diningHalls, loading, error } = useDiningHalls();

  console.log('diningHalls:', diningHalls, 'loading:', loading, 'error:', error);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!Array.isArray(diningHalls)) return <div>No data found.</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Vanderbilt Dining</h1>
          <p className="text-lg text-muted-foreground">Choose a dining hall to view today's menu</p>
        </div>
        <div className="space-y-4 max-w-md mx-auto">
          {diningHalls.map((name) => (
            <DiningHallCard
              key={name}
              id={name}
              name={name}
              icon={"🏛️"} // Placeholder, since backend only returns names
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
