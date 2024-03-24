import React from 'react';
import './../../styles/Atoms.css';

type props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

/*
 * Tile component is a wrapper component that wraps its children with a white background and padding.
 * It also has a border radius of 15px and column and row gap of 20px.
 */
const Tile = React.forwardRef<HTMLInputElement, props>(function Tile(
  { children, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={'' + (className ? ` ${className}` : '')}
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        columnGap: 20,
        rowGap: 20,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});

Tile.displayName = 'Tile';

export default Tile;
