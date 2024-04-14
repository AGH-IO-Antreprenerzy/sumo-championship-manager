import React, { ChangeEvent } from 'react';
import './../../styles/Molecules.css';

type props = {
  label: string;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;

  type?: 'text' | 'number';
  style?: React.CSSProperties;
  small?: boolean;
};

const ValueField: React.FC<props> = ({
  label,
  value,
  onChange,
  type = 'number',
  style,
  small = false,
}) => {
  return (
    <div className="valueField_container" style={style}>
      <label htmlFor={`input_${label}`} className="label">
        {label}
      </label>
      <input
        type={type}
        className={small ? 'inputSmall' : 'input'}
        name={`input_${label}`}
        value={value}
        onChange={onChange}
        min={0}
        max={1000}
      />
    </div>
  );
};

export default ValueField;
