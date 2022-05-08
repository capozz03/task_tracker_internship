/* eslint-disable no-unused-vars */ /* FIXME */
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Select, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFilters, UsersSlice } from 'store/slice';

type TOption = { label: string; value: string };

const ContributorsFilter = () => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');
  const searchedUsers = useSelector(UsersSlice.usersList);
  const isLoading = useSelector(UsersSlice.isLoadingStatus);
  const [options, setOptions] = useState<TOption[]>([]);

  const storeSelectedUsers = useSelector(TaskFilters.getFilterAssignUserIDArray);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    dispatch(UsersSlice.resetUserList());
    dispatch(
      UsersSlice.getUsersListPage({
        page: 1,
        limit: 100,
        search: searchValue,
      }),
    );
  }, [searchValue]);

  useEffect(() => {
    setOptions(
      searchedUsers ? searchedUsers.map((user) => ({ label: user.name, value: user.user_id })) : [],
    );
  }, [searchedUsers]);

  useEffect(() => {
    dispatch(TaskFilters.setFilterAssignUserIDArray(selectedUsers));
  }, [selectedUsers]);

  useEffect(() => {
    setSelectedUsers(storeSelectedUsers || []);
  }, [storeSelectedUsers]);

  const onSearch = (value: string) => {
    setSearchValue(value);
  };

  const onSelect = (value: string) => {
    setSelectedUsers([...selectedUsers, value]);
  };

  const onDeselect = (value: string) => {
    setSelectedUsers([...selectedUsers.filter((userID) => !(userID === value))]);
  };

  return (
    <div>
      <Select
        className={styles.contributorsSelect}
        placeholder="Выберите ..."
        notFoundContent={isLoading ? <Spin size="small" /> : 'Нет участников'}
        mode="multiple"
        searchValue={searchValue}
        value={selectedUsers}
        options={options}
        onDeselect={onDeselect}
        onSearch={onSearch}
        onSelect={onSelect}
      />
    </div>
  );
};
export default ContributorsFilter;
