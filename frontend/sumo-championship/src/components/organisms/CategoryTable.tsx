import React, { useCallback, useMemo } from 'react';
import './../../styles/Organisms.css';
import CategoryItem from '../Atoms/CategoryItem';
import { Category } from '../../types/Category';

type props = {
  categories: Category[];
  onUpdate: (categories: Category[]) => void;
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
      // onUpdate(newCategories);
    },
    [categories, onUpdate],
  );

  const categoriesList = useMemo(() => {
    return categories.map((category, index) => {
      return (
        <CategoryItem
          name={category.name}
          gender={category.gender}
          minAge={category.minAge}
          maxAge={category.maxAge}
          minWeight={category.minWeight}
          maxWeight={category.maxWeight}
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

  return (
    <div className="categoriesTable">
      <div className="categoryItemHeader">
        <div
          className="headerField"
          style={{
            flex: 3,
          }}
        >
          Name
        </div>
        <div className="headerField">Gender</div>
        <div className="headerField">Age</div>
        <div className="headerField">Weight</div>
        <div className="headerField">Options</div>
      </div>

      {categoriesList}
    </div>
  );
};

export default CategoryTable;
