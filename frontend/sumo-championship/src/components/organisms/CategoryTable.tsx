import React, { useMemo } from 'react';
import './../../styles/Organisms.css';
import CategoryItem from '../molecules/CategoryItem';
import { Category } from '../../types/Seasons';

type props = {
  categories: Category[];
  showOptions?: boolean;
  onDelete?: (category: Category) => void;
  onEdit?: (category: Category) => void;
  onEditCancel?: () => void;
  style?: React.CSSProperties;
};

const CategoryTable: React.FC<props> = ({
  categories,
  showOptions = false,
  onDelete,
  onEdit,
  onEditCancel,
  style,
}) => {
  const categoriesList = useMemo(() => {
    return categories.map((category, index) => {
      return (
        <CategoryItem
          name={category.name}
          minAge={category.minAge}
          maxAge={category.maxAge}
          weightCategories={category.weightCategories}
          key={index.toString()}
          onDelete={() => {
            if (onEditCancel) onEditCancel();
            if (onDelete) onDelete(category);
          }}
          onEdit={() => {
            if (onEdit) onEdit(category);
          }}
          onEditCancel={() => onEditCancel && onEditCancel()}
          showOptions={showOptions}
        />
      );
    });
  }, [categories, onDelete, onEdit, onEditCancel, showOptions]);

  return (
    <div className="categoriesTable" style={style}>
      <div className="categoryItemHeader">
        <div
          className="headerField"
          style={{
            flex: 3,
          }}
        >
          Name
        </div>
        <div className="headerField">Age</div>
        {showOptions && <div className="headerField">Options</div>}
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
