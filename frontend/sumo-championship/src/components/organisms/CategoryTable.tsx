import React, { useMemo } from 'react';
import './../../styles/Organisms.css';
import CategoryItem from '../Atoms/CategoryItem';

type props = {
  categories: { name: string; value: number }[];
};

const CategoryTable: React.FC<props> = ({ categories }) => {
  const categoriesList = useMemo(() => {
    return categories.map((category, index) => {
      return (
        <CategoryItem
          name={category.name}
          value={category.value}
          key={index.toString()}
        />
      );
    });
  }, [categories]);

  return <div className="categoriesTable">{categoriesList}</div>;
};

export default CategoryTable;
