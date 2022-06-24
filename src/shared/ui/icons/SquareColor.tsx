import React from 'react';

type SquareColorProps = {
  color: string;
}

const SquareColor = ({ color }: SquareColorProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="8" fill={color} />
  </svg>
);

export default SquareColor;
