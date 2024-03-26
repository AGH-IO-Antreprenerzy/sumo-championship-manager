import React, { ChangeEvent } from 'react';
import './../../styles/Molecules.css';

interface props {
  options: string[];
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  defaultOption?: string;
}

const SelectField: React.FC<props> = ({
  options,
  name,
  onChange,
  defaultOption,
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
        value={defaultOption}
      >
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
