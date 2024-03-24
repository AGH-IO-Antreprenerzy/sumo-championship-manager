import React, { useMemo } from 'react';
import './../../styles/Organisms.css';
import CategoryItem from '../molecules/CategoryItem';
import { Category } from '../../types/Seasons';

type props = {
  categories: Category[];
  onDelete: (category: Category) => void;
  onEdit: (category: Category) => void;
  onEditCancel: () => void;
};

const CategoryTable: React.FC<props> = ({
  categories,
  onDelete,
  onEdit,
  onEditCancel,
}) => {
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
            onEditCancel();
            onDelete(category);
          }}
          onEdit={() => {
            onEdit(category);
          }}
          onEditCancel={onEditCancel}
        />
      );
    });
  }, [categories, onDelete, onEdit, onEditCancel]);

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

      {categories.length > 0 ? (
        categoriesList
      ) : (
        <p
          style={{
            textAlign: 'center',
            marginTop: 40,
          }}
        >
          No categories yet
        </p>
      )}
    </div>
  );
};

export default CategoryTable;
