import React, { ChangeEvent } from 'react';
import './../../styles/Molecules.css';

type props = {
  label: string;
  value?: number | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number';
  style?: React.CSSProperties;
  small?: boolean;
  min?: number;
  max?: number;
};

const ValueField: React.FC<props> = ({
  label,
  value,
  onChange,
  type = 'number',
  style,
  small = false,
  min,
  max,
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
        value={value ?? undefined}
        onChange={onChange}
        min={min ?? 0}
        max={max ?? 1000}
      />
    </div>
  );
};

export default ValueField;
