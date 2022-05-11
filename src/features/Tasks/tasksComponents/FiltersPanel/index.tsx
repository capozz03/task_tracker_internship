import React from 'react';
import styles from './index.module.scss';
import SearchInput from './KeywordInput';
import ResetFiltersButton from './ResetFiltersButton';
import TagsFilter from 'features/Tasks/tasksComponents/FiltersPanel/TagsFilter';
import PriorityFilter from './PriorityFilter';
import AttachmentsFilter from './AttachmentsFilter';
import ProgressFilter from './ProgressFilter';

const FiltersPanel = () => (
  <div className={styles.container}>
    <SearchInput />
    <div>
      <div className={styles.labelText}>Участники</div>
    </div>
    <div>
      <div className={styles.labelText}>Метки</div>
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
