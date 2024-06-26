import React, { useCallback, useMemo } from 'react';
import './../../styles/Organisms.css';
import CategoryItem from '../molecules/CategoryItem';
import { Category, WeightCategory } from '../../types/Seasons';

type props = {
  categories: Category[];
  showOptions?: boolean;
  onDelete?: (category: Category) => void;
  onEdit?: (category: Category) => void;
  onEditCancel?: () => void;
  onUpdate?: (newCategories: Category[]) => void;
  style?: React.CSSProperties;
  editedCategoryNumber?: number;
};

const CategoryTable: React.FC<props> = ({
  categories,
  showOptions = false,
  onDelete,
  onEdit,
  onEditCancel,
  editedCategoryNumber,
  onUpdate,
  style,
}) => {
  const onWeightCategoryDelete = useCallback(
    (ageCategoryIndex: number, weightCategory: WeightCategory) => {
      const newCategories = [...categories];
      if (!onUpdate || !newCategories[ageCategoryIndex]) {
        return;
      }

      newCategories[ageCategoryIndex].weightsAndGender = newCategories[
        ageCategoryIndex
      ].weightsAndGender.filter((category) => {
        return !(
          category.gender === weightCategory.gender &&
          category.maxWeight === weightCategory.maxWeight
        );
      });
      onUpdate?.(newCategories);
    },
    [categories, onUpdate],
  );

  const categoriesList = useMemo(() => {
    return categories.map((category, index) => {
      return (
        <CategoryItem
          name={category.ageName}
          minAge={category.minAge}
          maxAge={category.maxAge}
          weightCategories={category.weightsAndGender}
          key={index.toString()}
          onDelete={() => {
            if (onEditCancel) onEditCancel();
            if (onDelete) onDelete(category);
          }}
          onEdit={() => {
            if (onEdit) onEdit(category);
          }}
          onEditCancel={() => onEditCancel && onEditCancel()}
          onWeightCategoryDelete={(weightCategory) =>
            onWeightCategoryDelete(index, weightCategory)
          }
          showOptions={showOptions}
          isEdited={editedCategoryNumber === index}
        />
      );
    });
  }, [
    categories,
    editedCategoryNumber,
    onDelete,
    onEdit,
    onEditCancel,
    onWeightCategoryDelete,
    showOptions,
  ]);

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
