export const diningHalls = [
  { id: 'rand', name: 'Rand Dining Center', icon: '🍽️' },
  { id: 'commons', name: 'The Commons', icon: '🍔' },
  { id: 'kissam', name: 'Kissam Kitchen', icon: '🥬' },
  { id: 'ebi', name: 'EBI', icon: '🥗' },
  { id: 'roth', name: 'Rothschild Hall', icon: '🍜' },
  { id: 'carmichael', name: 'Carmichael Dining', icon: '☕' },
  { id: 'zeppos', name: 'Zeppos Cafe', icon: '🥪' },
];

export interface MenuItem {
  id: string;
  diningHall: string;
  date: string;
  mealType: string;
  station: string;
  itemName: string;
}

export const mockMenuData: MenuItem[] = [
  // Rand - Today's Menu
  { id: '1', diningHall: 'rand', date: '2025-07-22', mealType: 'Breakfast', station: 'Grill', itemName: 'Scrambled Eggs' },
  { id: '2', diningHall: 'rand', date: '2025-07-22', mealType: 'Breakfast', station: 'Grill', itemName: 'Bacon' },
  { id: '3', diningHall: 'rand', date: '2025-07-22', mealType: 'Breakfast', station: 'Grill', itemName: 'Hash Browns' },
  { id: '4', diningHall: 'rand', date: '2025-07-22', mealType: 'Breakfast', station: 'Bakery', itemName: 'Fresh Bagels' },
  { id: '5', diningHall: 'rand', date: '2025-07-22', mealType: 'Breakfast', station: 'Bakery', itemName: 'Blueberry Muffins' },
  
  { id: '6', diningHall: 'rand', date: '2025-07-22', mealType: 'Lunch', station: 'Main Course', itemName: 'Grilled Chicken Breast' },
  { id: '7', diningHall: 'rand', date: '2025-07-22', mealType: 'Lunch', station: 'Main Course', itemName: 'Vegetable Stir Fry' },
  { id: '8', diningHall: 'rand', date: '2025-07-22', mealType: 'Lunch', station: 'Pizza', itemName: 'Margherita Pizza' },
  { id: '9', diningHall: 'rand', date: '2025-07-22', mealType: 'Lunch', station: 'Pizza', itemName: 'Pepperoni Pizza' },
  { id: '10', diningHall: 'rand', date: '2025-07-22', mealType: 'Lunch', station: 'Salad Bar', itemName: 'Caesar Salad' },
  { id: '11', diningHall: 'rand', date: '2025-07-22', mealType: 'Lunch', station: 'Salad Bar', itemName: 'Garden Vegetables' },
  
  { id: '12', diningHall: 'rand', date: '2025-07-22', mealType: 'Dinner', station: 'Grill', itemName: 'BBQ Ribs' },
  { id: '13', diningHall: 'rand', date: '2025-07-22', mealType: 'Dinner', station: 'Grill', itemName: 'Grilled Salmon' },
  { id: '14', diningHall: 'rand', date: '2025-07-22', mealType: 'Dinner', station: 'International', itemName: 'Chicken Tikka Masala' },
  { id: '15', diningHall: 'rand', date: '2025-07-22', mealType: 'Dinner', station: 'International', itemName: 'Basmati Rice' },
  { id: '16', diningHall: 'rand', date: '2025-07-22', mealType: 'Dinner', station: 'Sides', itemName: 'Roasted Vegetables' },
  
  // Commons - Today's Menu
  { id: '17', diningHall: 'commons', date: '2025-07-22', mealType: 'Breakfast', station: 'American', itemName: 'Pancakes' },
  { id: '18', diningHall: 'commons', date: '2025-07-22', mealType: 'Breakfast', station: 'American', itemName: 'French Toast' },
  { id: '19', diningHall: 'commons', date: '2025-07-22', mealType: 'Breakfast', station: 'Healthy Options', itemName: 'Oatmeal Bar' },
  
  { id: '20', diningHall: 'commons', date: '2025-07-22', mealType: 'Lunch', station: 'Deli', itemName: 'Turkey Sandwich' },
  { id: '21', diningHall: 'commons', date: '2025-07-22', mealType: 'Lunch', station: 'Deli', itemName: 'Ham & Swiss' },
  { id: '22', diningHall: 'commons', date: '2025-07-22', mealType: 'Lunch', station: 'Hot Entrees', itemName: 'Beef Chili' },
  { id: '23', diningHall: 'commons', date: '2025-07-22', mealType: 'Lunch', station: 'Hot Entrees', itemName: 'Cornbread' },
  
  { id: '24', diningHall: 'commons', date: '2025-07-22', mealType: 'Dinner', station: 'Featured', itemName: 'Herb Crusted Pork Loin' },
  { id: '25', diningHall: 'commons', date: '2025-07-22', mealType: 'Dinner', station: 'Featured', itemName: 'Mashed Sweet Potatoes' },
  { id: '26', diningHall: 'commons', date: '2025-07-22', mealType: 'Dinner', station: 'Vegetarian', itemName: 'Quinoa Buddha Bowl' },
];

export function getMenuForDiningHall(diningHallId: string, date: string) {
  return mockMenuData.filter(item => 
    item.diningHall === diningHallId && item.date === date
  );
}

export function getDiningHallById(id: string) {
  return diningHalls.find(hall => hall.id === id);
}