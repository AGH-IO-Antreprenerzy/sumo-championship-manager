import React from 'react';
import './../../styles/Atoms.css';

interface props {
  value: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const Button: React.FC<props> = ({
  value,
  style,
  onClick = () => {
    //
  },
  disabled = false,
}) => {
  return (
    <button
      className="button"
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;
