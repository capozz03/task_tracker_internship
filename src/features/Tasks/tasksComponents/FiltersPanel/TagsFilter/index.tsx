import React, { useEffect, useState } from 'react';
import { AutoComplete, Spin } from 'antd';
import { useDebounce } from 'shared';

const TagsFilter = () => {
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [fetching, setFetching] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const handleSearch = (e: string) => {
    setSearch(e);
    setTags((prev) => prev);
  };

  useEffect(() => {
    console.log(debouncedSearch);
    setFetching(true);
  },
  [debouncedSearch]);

  return (
    <AutoComplete style={{ width: 200 }} onSearch={handleSearch} placeholder="input here">
      {fetching
        ? <Spin />
        : (
          tags.map((email: string) => (
            <AutoComplete.Option key={email} value={email}>
              {email}
            </AutoComplete.Option>
          )))}
    </AutoComplete>
  );
};

export default TagsFilter;
