/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import './../../styles/Molecules.css';
import IconButton from '../Atoms/IconButton';

type props = {
  currentPage: number;
  totalPages: number;
  onPrevClick: () => void;
  onNextClick: () => void;
  style?: React.CSSProperties;
};

const iconStyle = {
  border: 'none',
  backgroundColor: 'transparent',
};

const PageSwitcher: React.FC<props> = ({
  currentPage,
  totalPages,
  onPrevClick,
  onNextClick,
  style,
}) => {
  return (
    <div className="pageSwitcher" style={style}>
      <IconButton
        name="left-arrow"
        size={20}
        style={iconStyle}
        disabled={totalPages === 0 || currentPage === 0}
        onClick={onPrevClick}
      />
      <p className="pageNumber nonSelectable">
        {totalPages === 0 ? 0 : currentPage + 1}
      </p>
      <IconButton
        name="right-arrow"
        size={20}
        style={iconStyle}
        disabled={totalPages === 0 || currentPage === totalPages - 1}
        onClick={onNextClick}
      />
    </div>
  );
};

export default PageSwitcher;
