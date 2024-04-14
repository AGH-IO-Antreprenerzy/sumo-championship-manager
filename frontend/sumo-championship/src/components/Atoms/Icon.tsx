import React from 'react';
import './../../styles/Atoms.css';

interface props {
  src: string;
  alt: string;
  size?: number;
}

const Icon: React.FC<props> = ({ src, alt, size }) => {
  return (
    <img
      className="icon"
      src={src}
      alt={alt}
      style={{ width: size, height: size }}
    />
  );
};

export default Icon;
