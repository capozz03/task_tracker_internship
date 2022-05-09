import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import { Select, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFilters, UsersSlice } from 'store/slice';
import { debounce } from 'lodash';

const ContributorsFilter = () => {
  const dispatch = useDispatch();

  const storeSelectedUserIDs = useSelector(TaskFilters.getFilterAssignUserIDArray);
  const [selectedUserIDs, setSelectedUserIDs] = useState<string[]>([]);

  const findedUsers = useSelector(UsersSlice.usersList);
  const isLoading = useSelector(UsersSlice.isLoadingStatus);
  const options = useMemo(
    () =>
      findedUsers.map((user) => ({
        label: user.name,
        value: user.user_id,
      })),
    [findedUsers, selectedUserIDs],
  );

  const fetchUsers = (searchValue: string) => {
    dispatch(UsersSlice.resetUserList());
    dispatch(
      UsersSlice.getUsersListPage({
        page: 1,
        limit: 50,
        search: searchValue,
      }),
    );
  };

  const onChange = (values: string[]) => {
    setSelectedUserIDs(values);
    dispatch(TaskFilters.setFilterAssignUserIDArray(values));
  };

  const onSearch = debounce((searchValue: string) => {
    fetchUsers(searchValue);
  }, 500);

  const fetchAllUsers = debounce(() => {
    fetchUsers('');
  }, 500);

  const notFoundContent = (
    <span className={styles.notFoundPlaceholder}>{isLoading ? <Spin /> : 'Нет участников'}</span>
  );

  useEffect(() => {
    setSelectedUserIDs(storeSelectedUserIDs || []);
  }, [storeSelectedUserIDs]);

  return (
    <div className={styles.contributorsSelectWrap}>
      <Select
        className={styles.contributorsSelect}
        dropdownClassName={styles.contributorsSelectDropdown}
        mode="multiple"
        placeholder="Выберите ..."
        filterOption={false}
        notFoundContent={notFoundContent}
        value={selectedUserIDs}
        options={options}
        onChange={onChange}
        onFocus={fetchAllUsers}
        onSearch={onSearch}
      />
    </div>
  );
};

export default ContributorsFilter;
