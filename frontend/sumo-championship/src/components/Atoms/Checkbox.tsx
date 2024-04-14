import React from 'react';
import './../../styles/Atoms.css';

interface Props {
  label: string;
  name?: string;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ label, name, id, onChange }, ref) => {
    return (
      <div className="checkbox">
        <label htmlFor={name ?? label}>{label}</label>
        <input
          type="checkbox"
          name={name ?? label}
          id={id ?? name ?? label}
          ref={ref}
          onChange={onChange}
        />
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
