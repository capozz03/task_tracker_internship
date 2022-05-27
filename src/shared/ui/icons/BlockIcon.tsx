import React from 'react';

type BlockIconProps = {
  color?: string;
}

const BlockIcon = ({ color }: BlockIconProps) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.6448 14.4564C17.5006 13.1829 18 11.6498 18 10C18 5.58172 14.4183 2 10 2C8.34883 2 6.8145 2.50023 5.54028 3.35741L16.6448 14.4564ZM15.3278 15.9679L4.0295 4.67511C2.76722 6.08945 2 7.95513 2 10C2 14.4183 5.58172 18 10 18C12.0463 18 13.9131 17.2317 15.3278 15.9679ZM10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0Z"
      fill={color || 'currentColor'}
    />
  </svg>
);

export default BlockIcon;
