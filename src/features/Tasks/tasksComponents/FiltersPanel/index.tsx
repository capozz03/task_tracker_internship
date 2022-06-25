import React from 'react';
import styles from './index.module.scss';
import SearchInput from './KeywordInput';
import ResetFiltersButton from './ResetFiltersButton';
import TagsFilter from 'features/Tasks/tasksComponents/FiltersPanel/TagsFilter';
import PriorityFilter from './PriorityFilter';
import AttachmentsFilter from './AttachmentsFilter';
import ProgressFilter from './ProgressFilter';
import ContributorsFilter from './ContributorsFilter';
import TagsEditor from 'features/Tasks/tasksComponents/TagsEditor';
import classNames from 'classnames';

const FiltersPanel = () => (
  <div className={styles.container}>
    <SearchInput />
    <div>
      <div className={styles.labelText}>Участники</div>
      <ContributorsFilter />
    </div>
    <div>
      <div className={classNames([styles.labelText, styles.tags])}>
        Метки
        <span className={styles.tagsEditor}><TagsEditor container=".ant-layout-sider-children" /></span>
      </div>
      <TagsFilter />
    </div>
    <div>
      <div className={styles.labelText}>Другие</div>
      <AttachmentsFilter />
    </div>
    <div>
      <div className={styles.labelText}>Степень готовности</div>
      <ProgressFilter />
    </div>
    <div>
      <div className={styles.labelText}>Приоритет</div>
      <PriorityFilter />
    </div>
    <ResetFiltersButton />
  </div>
);

export default FiltersPanel;
