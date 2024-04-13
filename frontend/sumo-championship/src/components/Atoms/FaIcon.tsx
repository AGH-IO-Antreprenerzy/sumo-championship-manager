import React from 'react';
import './../../styles/Atoms.css';
import * as FaIcons from 'react-icons/fa';

type Props = {
  name: keyof typeof FaIcons;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
};
// All emojis: https://react-icons.github.io/react-icons/icons/fa/
const FaIcon: React.FC<Props> = ({ name, size, color, style }) => {
  const IconComponent = FaIcons[name];

  if (!IconComponent) {
    // Return a default one
    return <FaIcons.FaBeer />;
  }

  return <IconComponent size={size} color={color ?? 'black'} style={style} />;
};

export default FaIcon;
