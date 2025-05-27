import { useState, useEffect } from 'react';
import categoriesData from '../data/categories.json';
import { Category } from '../types/category';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Simulate API fetch delay
      const fetchData = async () => {
        setLoading(true);
        
        // Artificial delay to simulate network request
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setCategories(categoriesData.categories);
        setLoading(false);
      };
      
      fetchData();
    } catch (err) {
      setError('Failed to load categories data');
      setLoading(false);
    }
  }, []);

  return {
    categories,
    loading,
    error
  };
};