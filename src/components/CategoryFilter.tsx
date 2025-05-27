import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Category } from '../types/category';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onSelectCategory: (categoryName: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategories, 
  onSelectCategory 
}) => {
  // Dynamically get icon from Lucide based on string name
  const getIcon = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
    return IconComponent ? <IconComponent size={18} /> : <LucideIcons.Tag size={18} />;
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">Filter by Category</h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.name);
          
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory(category.name)}
              className={`flex items-center px-3 py-2 rounded-full text-sm transition-all duration-300 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{getIcon(category.icon)}</span>
              {category.name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;