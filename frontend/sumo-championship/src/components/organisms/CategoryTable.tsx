import React, { useCallback, useMemo } from 'react';
import './../../styles/Organisms.css';
import CategoryItem from '../Atoms/CategoryItem';

type props = {
  categories: { name: string; value: number }[];
  onUpdate: (categories: { name: string; value: number }[]) => void;
};

const CategoryTable: React.FC<props> = ({ categories, onUpdate }) => {
  const deleteCategory = useCallback(
    (index: number) => {
      const newCategories = categories.filter((_, i) => i !== index);
      onUpdate(newCategories);
    },
    [categories, onUpdate],
  );

  const editCategory = useCallback(
    (index: number, name: string, value: number) => {
      const newCategories = categories.map((category, i) => {
        if (i === index) {
          return { name, value };
        }
        return category;
      });
      onUpdate(newCategories);
    },
    [categories, onUpdate],
  );

  const categoriesList = useMemo(() => {
    return categories.map((category, index) => {
      return (
        <CategoryItem
          name={category.name}
          value={category.value}
          key={index.toString()}
          onDelete={() => {
            deleteCategory(index);
          }}
          onEdit={(newName, newValue) => {
            editCategory(index, newName, newValue);
          }}
        />
      );
    });
  }, [categories, deleteCategory, editCategory]);

  return <div className="categoriesTable">{categoriesList}</div>;
};

export default CategoryTable;
