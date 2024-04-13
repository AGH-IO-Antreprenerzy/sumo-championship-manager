/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import './../../styles/Molecules.css';
import { WeightCategory } from '../../types/Seasons';
import RemovableTag from '../Atoms/RemovableTag';

type props = {
  name: string;
  categories: WeightCategory[];
  onDelete: (weight: number) => void;
  showOptions?: boolean;
};

const WeightCategoryList: React.FC<props> = ({
  name,
  categories,
  onDelete,
  showOptions = false,
}) => {
  return (
    <div className="weightCategoryList">
      <p>{name}</p>
      <div className="list">
        {categories.length > 0
          ? categories.map((category) => (
              <RemovableTag
                key={`${name}${category.maxWeight}`}
                name={`<${category.maxWeight}kg`}
                onDelete={
                  showOptions
                    ? () => {
                        onDelete(category.maxWeight);
                      }
                    : undefined
                }
              />
            ))
          : '-'}
      </div>
    </div>
  );
};

export default WeightCategoryList;
