import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TagsSlice } from 'store/slice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { List, Skeleton } from 'antd';
import Tooltip from 'features/Tasks/tasksComponents/Tooltip';
import styles from './index.module.scss';
import TagItem from './TagItem';
import ModalTagDelete from '../ModalTagDelete';
import ModalTagEdit from '../ModalTagEdit';
import PlusIcon from 'shared/ui/icons/PlusIcon/PlusIcon';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TagsEditorBody = () => {
  const dispatch = useDispatch();
  const tags = useSelector(TagsSlice.getTagsSelector);
  const [isVisibleModalDelete, setIsVisibleModalDelete] = useState(false);
  const [isVisibleModalEdit, setIsVisibleModalEdit] = useState(false);
  const loadMoreData = () => {
    // функционал на будующее, для дозагрузки тегов
  };

  const visibleModalForDelete = () => {
    setIsVisibleModalDelete(true);
  };

  const visibleModalForEdit = () => {
    setIsVisibleModalEdit(true);
  };

  const newTagHandle = () => {
    dispatch(TagsSlice.setCurrentTag({
      color: '#FF974A',
      name: '',
      task_tag_id: '',
      created: '',
      updated: '',
    }));
    setIsVisibleModalEdit(true);
  };

  return (
    <div
      role="button"
      tabIndex={-1}
      onKeyDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <header className={styles.header}>
        <div className={styles.title}>
          Настроить метки
        </div>
        <div>
          <Tooltip title="Создать новую метку">
            <button type="button" onClick={newTagHandle} className={styles.btnCreateTag}>
              <PlusIcon />
            </button>
          </Tooltip>
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
          <List className={styles.listWrap}>
            <TransitionGroup>
              {
                tags.map((tag) => (
                  <CSSTransition
                    key={tag.task_tag_id}
                    timeout={500}
                    classNames="item"
                  >
                    <TagItem
                      showModalForDelete={visibleModalForDelete}
                      showModalForEdit={visibleModalForEdit}
                      tag={tag}
                    />
                  </CSSTransition>
                ))
              }
            </TransitionGroup>
          </List>
        </InfiniteScroll>
      </div>
      <ModalTagDelete
        isVisibleModal={isVisibleModalDelete}
        setIsVisibleModal={setIsVisibleModalDelete}
      />
      <ModalTagEdit
        isVisibleModal={isVisibleModalEdit}
        setIsVisibleModal={setIsVisibleModalEdit}
      />
    </div>
  );
};

export default TagsEditorBody;
