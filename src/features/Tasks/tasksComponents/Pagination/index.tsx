import React from 'react';
import { Pagination as AntPagination, PaginationProps } from 'antd';
import './index.module.scss';

const Pagination = ({ ...props }:PaginationProps) => (
  <AntPagination
    defaultPageSize={3}
    showSizeChanger
    pageSizeOptions={[3, 6, 9, 12]}
    showTotal={(total, range) => `${range[0]}-${range[1]} из ${total}`}
    total={props.total}
    locale={{ items_per_page: '' }}
    {...props}
  />
);

export default Pagination;
