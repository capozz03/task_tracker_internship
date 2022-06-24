import React from 'react';
import { useSelector } from 'react-redux';
import { TagsSlice } from 'store/slice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { List, Skeleton } from 'antd';
import styles from './index.module.scss';
import TagItem from 'features/Tasks/tasksComponents/TagsEditor/TagsEditorBody/TagItem';

const TagsEditorBody = () => {
  const tags = useSelector(TagsSlice.getTagsSelector);
  const loadMoreData = () => {
    // console.log(1);
  };
  return (
    <>
      <header className={styles.header}>
        <div className={styles.title}>
          Настроить метки
        </div>
      </header>
      <div
        className={styles.wrap}
        style={{
          height: 300,
          overflow: 'auto',
        }}
      >
        <InfiniteScroll
          dataLength={tags.length}
          next={loadMoreData}
          hasMore={tags.length < 2}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          scrollableTarget="scrollableDiv"
        >
          <List
            className={styles.listWrap}
            dataSource={tags}
            renderItem={(tag) => (
              <TagItem tag={tag} />
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default TagsEditorBody;
