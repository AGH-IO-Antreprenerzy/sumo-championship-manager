import React, { ChangeEvent } from 'react';
import './../../styles/Molecules.css';

interface props {
  options: string[];
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  defaultOption?: string;
  placeholder?: string;
  value?: string;
}

const SelectField: React.FC<props> = ({
  options,
  name,
  onChange,
  defaultOption,
  placeholder,
  value,
}) => {
  return (
    <div className="textField_container">
      <label htmlFor={name} className="label">
        {name}
      </label>
      <select
        name={name}
        className="selectField"
        onChange={onChange}
        value={defaultOption ?? value}
      >
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}
        {options.map((option, id) => (
          <option key={id} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
