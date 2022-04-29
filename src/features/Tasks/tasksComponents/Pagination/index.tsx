import React from 'react';
import { Pagination as AntPagination, PaginationProps } from 'antd';
import styles from './index.module.scss';

const Pagination = ({ ...props }:PaginationProps) => {
  if (props.total === 0) {
    return (
      <>
      </>
    );
  }
  return (
    <AntPagination
      className={styles.myPagination}
      current={props.current}
      defaultCurrent={1}
      defaultPageSize={3}
      responsive
      showSizeChanger
      onChange={props.onChange}
      pageSizeOptions={[3, 6, 9, 12]}
      showTotal={(total, range) => `${range[0]}-${range[1]} из ${total}`}
      total={props.total}
      locale={{ items_per_page: '' }}
      {...props}
    />
  );
};

export default Pagination;
