/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import './../../styles/Molecules.css';
import ValueField from './ValueField';

type props = {
  minValue: number;
  maxValue: number;
  onMinChange?: (value: number) => void;
  onMaxChange?: (value: number) => void;
  style?: React.CSSProperties;
  errorMessage?: string;
};

const MinMaxField: React.FC<props> = ({
  minValue,
  maxValue,
  onMinChange = () => {},
  onMaxChange = () => {},
  style,
  errorMessage,
}) => {
  return (
    <div className="minMaxField_container">
      <div className="fields" style={style}>
        <ValueField
          label="Min"
          value={minValue}
          onChange={(e) => onMinChange(Number(e.target.value))}
        />
        <ValueField
          label="Max"
          value={maxValue}
          onChange={(e) => onMaxChange(Number(e.target.value))}
        />
      </div>
      <div className="error"> {errorMessage && `*${errorMessage}`} </div>
    </div>
  );
};

export default MinMaxField;
