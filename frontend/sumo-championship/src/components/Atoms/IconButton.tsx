import React from 'react';
import './../../styles/Atoms.css';
import Icon from './Icon';

interface props {
  name: string;
  size: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const IconButton: React.FC<props> = ({
  name,
  size,
  style,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
}) => {
  return (
    <button className="iconButton" style={style} onClick={onClick}>
      <Icon
        src={require(`./../../assets/${name}.png`)}
        alt={name}
        size={size - 2}
      />
    </button>
  );
};

export default IconButton;
