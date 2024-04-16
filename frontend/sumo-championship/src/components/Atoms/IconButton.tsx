import React from 'react';
import './../../styles/Atoms.css';
import * as FaIcons from 'react-icons/fa';
import FaIcon from './FaIcon';

interface props {
  name: keyof typeof FaIcons;
  size: number;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  iconSttyle?: React.CSSProperties;
}

const IconButton: React.FC<props> = ({
  name,
  size,
  style,
  color,
  iconSttyle,
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
      <FaIcon name={name} size={size - 2} color={color} style={iconSttyle} />
    </button>
  );
};

export default IconButton;
