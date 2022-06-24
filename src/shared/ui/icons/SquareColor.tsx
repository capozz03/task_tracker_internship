import React from 'react';

type SquareColorProps = {
  color: string;
  check?: boolean;
}

const SquareColor = ({ color, check = false }: SquareColorProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="8" fill={color} />
    { check && <path fillRule="evenodd" clipRule="evenodd" d="M7.80233 10.648C7.54068 10.389 7.11857 10.3911 6.85953 10.6527C6.60049 10.9144 6.60261 11.3365 6.86426 11.5955L10.7478 15.4404C11.022 15.7118 11.4686 15.6946 11.7211 15.4028L17.1708 9.10283C17.4117 8.82437 17.3812 8.40336 17.1028 8.16248C16.8243 7.9216 16.4033 7.95206 16.1624 8.23052L11.1792 13.9912L7.80233 10.648Z" fill="white" /> }
  </svg>
);

export default SquareColor;
