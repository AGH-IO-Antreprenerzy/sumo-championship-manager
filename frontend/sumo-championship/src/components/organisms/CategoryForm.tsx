import React, { useState } from 'react';
import TextField from '../molecules/TextField';
import './../../styles/Organisms.css';
import ValueField from '../molecules/ValueField';
import Button from '../Atoms/Button';

type props = {
  inputTitle: string;
  subinputTitle: string;
  errorMessage?: string;
  onSubmit?: (value: string, subValue: string) => void;
};

const CategoryForm: React.FC<props> = ({
  inputTitle,
  subinputTitle,
  errorMessage,
  onSubmit,
}) => {
  const [value, setValue] = useState('');
  const [subValue, setSubValue] = useState('');

  return (
    <div className="categoryForm">
      <div className="inputs">
        <TextField
          label={inputTitle}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          small
          errorMessage={errorMessage}
          style={{ marginRight: 20 }}
        />

        <ValueField
          label={subinputTitle}
          value={subValue}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0) {
              setSubValue(e.target.value);
            }
          }}
          small
        />
      </div>
      <Button
        value="Add"
        onClick={() => {
          if (onSubmit) {
            onSubmit(value, subValue);
          }
        }}
      />
    </div>
  );
};

export default CategoryForm;
