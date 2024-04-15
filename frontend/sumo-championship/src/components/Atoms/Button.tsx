import React from 'react';
import './../../styles/Atoms.css';

interface props {
  name: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const Button: React.FC<props> = ({
  name,
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
      {name}
    </button>
  );
};

export default Button;
