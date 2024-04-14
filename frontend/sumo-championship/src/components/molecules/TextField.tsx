import React, { ChangeEvent } from 'react';
import './../../styles/Molecules.css';

type props = {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string | null;
  type?: 'text' | 'password' | 'date';
  style?: React.CSSProperties;
  small?: boolean;
};

const TextField: React.FC<props> = ({
  label,
  value,
  onChange,
  errorMessage,
  type,
  style,
  small = false,
}) => {
  return (
    <div className="textField_container" style={style}>
      <label htmlFor={`input_${label}`} className="label">
        {label}
      </label>
      <input
        type={type ?? 'text'}
        className={small ? 'inputSmall' : 'input'}
        name={`input_${label}`}
        value={value}
        onChange={onChange}
        placeholder={label}
      />
      <div className="error"> {errorMessage && `*${errorMessage}`} </div>
    </div>
  );
};

export default TextField;
