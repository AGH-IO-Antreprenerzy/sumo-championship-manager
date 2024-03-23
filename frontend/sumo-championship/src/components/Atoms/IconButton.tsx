import React from 'react';
import './../../styles/Atoms.css';
import Icon from './Icon';

interface props {
  name: string;
  size: number;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
}

const IconButton: React.FC<props> = ({
  name,
  size,
  style,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  disabled = false,
}) => {
  return (
    <button
      className={'iconButton' + (disabled ? ' disabledButton' : '')}
      style={{ ...style, opacity: disabled ? 0.5 : 1 }}
      onClick={() => !disabled && onClick()}
    >
      <Icon
        src={require(`./../../assets/${name}.png`)}
        alt={name}
        size={size - 2}
      />
    </button>
  );
};

export default IconButton;
