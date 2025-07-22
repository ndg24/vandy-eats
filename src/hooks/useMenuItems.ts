import { useEffect, useState } from 'react';
import axios from 'axios';

export interface MenuItem {
  id: number;
  name: string;
  date: string;
  meal: string;
  station: string;
  dining_hall: string;
}

export function useMenuItems(date: string, diningHall: string) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date || !diningHall) {
      setMenuItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/menu_items`, {
      params: { date, dining_hall: diningHall }
    })
      .then(res => {
        setMenuItems(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
        console.log('API response:', res.data);
        console.log('First menu item:', res.data[0]);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [date, diningHall]);

  return { menuItems, loading, error };
} 