import React from 'react';

type IconProps = {
  color: string,
}

const PencilIcon = ({ color = '#B5B5BE' }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M17.861 7.5961L18.9757 6.48135L16.5187 4.02428L15.4039 5.13904L17.861 7.5961ZM16.4542 9.00288L13.9971 6.54581L4.80565 15.7373L4.24014 18.7599L7.26272 18.1943L16.4542 9.00288ZM20.4419 5.13399C21.186 5.87811 21.186 7.08458 20.4419 7.82871L8.45174 19.8189C8.30989 19.9607 8.12847 20.0564 7.93129 20.0933L3.17816 20.9826C2.49083 21.1112 1.88885 20.5092 2.01744 19.8218L2.90674 15.0687C2.94363 14.8715 3.03928 14.6901 3.18113 14.5483L15.1713 2.55809C15.9154 1.81397 17.1219 1.81397 17.866 2.55809L20.4419 5.13399ZM20.0099 21H11.9901C10.67 21 10.67 19 11.9901 19H20.0099C21.33 19 21.33 21 20.0099 21Z" fill={color} />
  </svg>
);

export default PencilIcon;
