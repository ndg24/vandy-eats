import { useEffect, useState } from 'react';
import axios from 'axios';

export function useDiningHalls() {
  const [diningHalls, setDiningHalls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/dining_halls`)
      .then(res => {
        setDiningHalls(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { diningHalls, loading, error };
} 