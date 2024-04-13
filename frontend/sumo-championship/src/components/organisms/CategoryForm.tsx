import React, { useState } from 'react';
import './../../styles/Organisms.css';
import { Category } from '../../types/Seasons';
import CategoryTable from './CategoryTable';
import Tile from '../Atoms/Tile';
import AgeCategoryFrom from '../molecules/AgeCategoryFrom';
import WeightCategoryFrom from '../molecules/WeightCategoryFrom';
type props = {
  onUpdate: (categories: Category[]) => void;
};

const CategoryForm: React.FC<props> = ({ onUpdate }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editedCategoryNumber, setEditedCategoryNumber] = useState(-1);
  const isEdited = editedCategoryNumber > -1;

  const handleSave = (newCategories: Category[]) => {
    setCategories(newCategories);
    setEditedCategoryNumber(-1);
  };

  const handleDelete = (category: Category) => {
    setCategories(categories.filter((c) => c.name !== category.name));
  };

  const handleEdit = (category: Category) => {
    setEditedCategoryNumber(
      categories.findIndex((c) => c.name === category.name),
    );
  };

  const handleEditCancel = () => {
    setEditedCategoryNumber(-1);
  };

  return (
    <Tile className="categories categoriesLayout">
      <div style={{ flex: 1 }}>
        <p className="subtitle mb10">Categories</p>
        <div className="categoryForms">
          <AgeCategoryFrom
            isEdited={isEdited}
            onSave={handleSave}
            editedCategoryNumber={editedCategoryNumber}
            categories={categories}
          />
          <hr />
          <WeightCategoryFrom
            isEdited={isEdited}
            onSave={handleSave}
            editedCategoryNumber={editedCategoryNumber}
            categories={categories}
          />
        </div>
      </div>

      <div style={{ flex: 2 }}>
        <CategoryTable
          categories={categories}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onEditCancel={handleEditCancel}
          onUpdate={handleSave}
          showOptions
        />
      </div>
    </Tile>
  );
};

export default CategoryForm;
