import React from 'react';
import './../../styles/Atoms.css';

interface Props {
  label: string;
  name?: string;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = React.forwardRef<HTMLInputElement, Props>(
  ({ label, name, id, onChange }, ref) => {
    return (
      <div className="radio">
        <label htmlFor={name ?? label}>{label}</label>
        <input
          type="radio"
          name={name ?? label}
          id={id ?? name ?? label}
          ref={ref}
          onChange={onChange}
          className="radioButton"
        />
      </div>
    );
  },
);

RadioButton.displayName = 'RadioButton';

export default RadioButton;
