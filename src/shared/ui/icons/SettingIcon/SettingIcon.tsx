import React from 'react';

type SettingIconProps = {
  color?: string;
}

const SettingIcon = ({ color }: SettingIconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.09429 3.33907C9.38357 1.97584 10.5958 1 12 1C13.4042 1 14.6164 1.97584 14.9057 3.33907L14.962 3.60457C16.0187 3.97101 16.9989 4.53018 17.8497 5.2566L18.1074 5.17298C19.442 4.73991 20.9 5.29353 21.6021 6.5C22.3042 7.70647 22.0585 9.23593 21.0131 10.1661L20.8113 10.3457C21.02 11.4399 21.018 12.5617 20.8095 13.6528L21.0131 13.8339C22.0585 14.7641 22.3042 16.2935 21.6021 17.5C20.9 18.7065 19.442 19.2601 18.1074 18.827L17.8489 18.7431C17.4276 19.1021 16.971 19.4234 16.4827 19.7031C15.9945 19.9827 15.4857 20.2144 14.9617 20.3969L14.9057 20.6609C14.6164 22.0242 13.4042 23 12 23C10.5958 23 9.38357 22.0242 9.09429 20.6609L9.03795 20.3954C7.98129 20.029 7.00107 19.4698 6.1503 18.7434L5.8926 18.827C4.55798 19.2601 3.10004 18.7065 2.39794 17.5C1.69584 16.2935 1.94155 14.7641 2.98689 13.8339L3.18874 13.6543C2.98002 12.5601 2.98202 11.4383 3.19048 10.3472L2.98689 10.1661C1.94155 9.23593 1.69584 7.70647 2.39794 6.5C3.10004 5.29353 4.55798 4.73991 5.8926 5.17298L6.1511 5.25686C6.57236 4.89792 7.02899 4.5766 7.51725 4.29693C8.00551 4.01726 8.51431 3.78559 9.03826 3.60311L9.09429 3.33907ZM12 3C11.5491 3 11.1598 3.31335 11.067 3.75109L10.8893 4.58834C10.8115 4.95506 10.5335 5.24784 10.1692 5.34682C9.59911 5.50169 9.04777 5.72966 8.52521 6.02898C8.00265 6.3283 7.52798 6.68802 7.10776 7.10038C6.83919 7.36392 6.44464 7.45636 6.0856 7.33986L5.26593 7.07388C4.83737 6.93482 4.36922 7.1126 4.14377 7.5C3.91832 7.8874 3.99722 8.37852 4.33289 8.6772L4.97653 9.24993C5.25789 9.50029 5.37444 9.88578 5.27841 10.2484C4.97456 11.396 4.97134 12.6029 5.27656 13.7524C5.37291 14.1152 5.25641 14.501 4.97486 14.7516L4.33289 15.3228C3.99722 15.6215 3.91832 16.1126 4.14377 16.5C4.36922 16.8874 4.83737 17.0652 5.26593 16.9261L6.08555 16.6602C6.44502 16.5435 6.84005 16.6363 7.10861 16.9005C7.95939 17.7375 9.01454 18.3382 10.1682 18.6509C10.5328 18.7497 10.811 19.0426 10.8888 19.4095L11.067 20.2489C11.1598 20.6867 11.5491 21 12 21C12.4509 21 12.8402 20.6867 12.933 20.2489L13.1107 19.4117C13.1885 19.0449 13.4665 18.7522 13.8308 18.6532C14.4009 18.4983 14.9522 18.2703 15.4748 17.971C15.9974 17.6717 16.472 17.312 16.8922 16.8996C17.1608 16.6361 17.5554 16.5436 17.9144 16.6601L18.7341 16.9261C19.1626 17.0652 19.6308 16.8874 19.8562 16.5C20.0817 16.1126 20.0028 15.6215 19.6671 15.3228L19.0235 14.7501C18.7421 14.4997 18.6256 14.1142 18.7216 13.7516C19.0254 12.604 19.0287 11.3971 18.7234 10.2476C18.6271 9.88479 18.7436 9.49897 19.0251 9.24844L19.6671 8.6772C20.0028 8.37852 20.0817 7.8874 19.8562 7.5C19.6308 7.1126 19.1626 6.93482 18.7341 7.07388L17.9144 7.33984C17.555 7.45649 17.1599 7.36367 16.8914 7.09947C16.0406 6.2625 14.9855 5.6618 13.8318 5.3491C13.4672 5.25027 13.189 4.95739 13.1112 4.59046L12.933 3.75109C12.8402 3.31335 12.4509 3 12 3ZM12 15.6316C14.0216 15.6316 15.6605 14.0057 15.6605 12C15.6605 9.99433 14.0216 8.36842 12 8.36842C9.97838 8.36842 8.33953 9.99433 8.33953 12C8.33953 14.0057 9.97838 15.6316 12 15.6316ZM12 13.6316C11.0917 13.6316 10.3554 12.9011 10.3554 12C10.3554 11.0989 11.0917 10.3684 12 10.3684C12.9083 10.3684 13.6446 11.0989 13.6446 12C13.6446 12.9011 12.9083 13.6316 12 13.6316Z"
      fill={color || 'currentColor'}
    />
  </svg>
);

export default SettingIcon;
