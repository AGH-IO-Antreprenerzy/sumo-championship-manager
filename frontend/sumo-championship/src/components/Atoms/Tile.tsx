import React from 'react';
import './../../styles/Atoms.css';

type props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const Tile = React.forwardRef<HTMLInputElement, props>(function Tile(
  { children, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={'tile' + (className ? ` ${className}` : '')}
      {...rest}
    >
      {children}
    </div>
  );
});

Tile.displayName = 'Tile';

export default Tile;
