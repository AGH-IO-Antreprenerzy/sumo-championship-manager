import React from 'react';
import './../../styles/Atoms.css';

interface props {
  value: string;
  style?: React.CSSProperties;
  onClick: () => void;
}

const Button: React.FC<props> = ({ value, style, onClick }) => {
  return (
    <button className="submit" style={style} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
