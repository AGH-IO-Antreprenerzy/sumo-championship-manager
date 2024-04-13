import React, { useEffect, useState } from 'react';
import './../../styles/Organisms.css';
import { Category } from '../../types/Seasons';
import CategoryTable from './CategoryTable';
import Tile from '../Atoms/Tile';
import AgeCategoryFrom from '../molecules/CategoryForm/AgeCategoryFrom';
import WeightCategoryFrom from '../molecules/CategoryForm/WeightCategoryFrom';
type props = {
  onUpdate: (categories: Category[]) => void;
};

const CategoryForm: React.FC<props> = ({ onUpdate }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editedCategoryNumber, setEditedCategoryNumber] = useState(-1);

  const handleSave = (newCategories: Category[]) => {
    setCategories(newCategories);
    setEditedCategoryNumber(-1);
  };

  const handleDelete = (category: Category) => {
    setCategories(categories.filter((c) => c.ageName !== category.ageName));
  };

  const handleEdit = (category: Category) => {
    setEditedCategoryNumber(
      categories.findIndex((c) => c.ageName === category.ageName),
    );
  };

  const handleEditCancel = () => {
    setEditedCategoryNumber(-1);
  };

  useEffect(() => {
    onUpdate(categories);
  }, [categories, onUpdate]);

  return (
    <Tile className="categories categoriesLayout">
      <div style={{ flex: 1 }}>
        <p className="subtitle mb10">Categories</p>
        <div className="categoryForms">
          <AgeCategoryFrom
            onSave={handleSave}
            editedCategoryNumber={editedCategoryNumber}
            categories={categories}
          />
          <hr />
          <WeightCategoryFrom onSave={handleSave} categories={categories} />
        </div>
      </div>

      <div style={{ flex: 2 }}>
        <CategoryTable
          categories={categories}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onEditCancel={handleEditCancel}
          editedCategoryNumber={editedCategoryNumber}
          onUpdate={handleSave}
          showOptions
        />
      </div>
    </Tile>
  );
};

export default CategoryForm;
