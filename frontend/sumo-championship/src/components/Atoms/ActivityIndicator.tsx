import React from 'react';
import './../../styles/Atoms.css';
import { ThreeDot } from 'react-loading-indicators';

interface props {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  textColor?: string;
}

const ActivityIndicator: React.FC<props> = ({
  color = '#f37316',
  size = 'medium',
  text = '',
  textColor = '',
}) => {
  return (
    <ThreeDot
      variant="bob"
      color={color}
      size={size}
      text={text}
      textColor={textColor}
    />
  );
};

export default ActivityIndicator;
