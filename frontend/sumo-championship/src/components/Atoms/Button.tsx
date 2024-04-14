import React from 'react';
import './../../styles/Atoms.css';

interface props {
  name: string;
  style?: React.CSSProperties;
  onClick: () => void;
}

const Button: React.FC<props> = ({ name: value, style, onClick }) => {
  return (
    <button className="button" style={style} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
