import React from 'react';
import './../../styles/Atoms.css';

interface props {
  value: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const Button: React.FC<props> = ({ value, style, onClick = () => {} }) => {
  return (
    <button className="button" style={style} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
