import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import { Select, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFilters, UsersSlice } from 'store/slice';
import { debounce } from 'lodash';
import { alert } from 'shared';
import XIcon from 'shared/ui/icons/XIcon';

type TValue = {
  label: string;
  value: string;
};

const ContributorsFilter = () => {
  const dispatch = useDispatch();

  const storeSelectedUserIDs = useSelector(TaskFilters.getFilterAssignUserIDArray);
  const [selectedUserIDs, setSelectedUserIDs] = useState<TValue[]>([]);

  const findedUsers = useSelector(UsersSlice.usersList);
  const isLoading = useSelector(UsersSlice.isLoadingStatus);
  const options = useMemo(
    () =>
      findedUsers
        .map((user) => ({
          label: user.name,
          value: user.user_id,
        }))
        .filter((user) => !selectedUserIDs.map((o) => o.value).includes(user.value)),
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

  const onChange = (values: TValue[]) => {
    if (values.length <= 10) {
      const idsArray = values.map((obj) => obj.value);
      setSelectedUserIDs(values);
      dispatch(TaskFilters.setFilterAssignUserIDArray(idsArray));
    } else {
      alert('Нельзя выбрать больше участников', 'warning');
    }
  };

  const onSearch = debounce((searchValue: string) => {
    fetchUsers(searchValue);
  }, 500);

  const fetchAllUsers = debounce(() => {
    fetchUsers('');
  }, 500);

  const onDeselectFactory = (id: string) => () => {
    const filteredUsers = selectedUserIDs.filter((user) => user.value !== id);
    setSelectedUserIDs(filteredUsers);
    dispatch(TaskFilters.setFilterAssignUserIDArray(filteredUsers.map((user) => user.value)));
  };

  const notFoundContent = (
    <span className={styles.notFoundPlaceholder}>{isLoading ? <Spin /> : 'Нет участников'}</span>
  );

  useEffect(() => {
    if (!storeSelectedUserIDs || storeSelectedUserIDs.length === 0) {
      setSelectedUserIDs([]);
    }
  }, [storeSelectedUserIDs]);

  return (
    <div className={styles.contributorsSelectWrap}>
      <Select
        className={styles.contributorsSelect}
        dropdownClassName={styles.contributorsSelectDropdown}
        labelInValue
        mode="multiple"
        placeholder="Выберите ..."
        getPopupContainer={() => document.querySelector('.ant-layout') as HTMLElement}
        showArrow
        filterOption={false}
        maxTagCount={0}
        maxTagPlaceholder={<span className={styles.placeholder}>Выберите еще ...</span>}
        notFoundContent={notFoundContent}
        value={selectedUserIDs}
        options={options}
        onChange={onChange}
        onFocus={fetchAllUsers}
        onSearch={onSearch}
      />
      <div className={styles.selectedList}>
        {selectedUserIDs.map((user) => (
          <div className={styles.selectedItem} key={user.value}>
            <span className={styles.name}>{user.label}</span>
            <button
              type="button"
              className={styles.deselect}
              onClick={onDeselectFactory(user.value)}
            >
              <XIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributorsFilter;
