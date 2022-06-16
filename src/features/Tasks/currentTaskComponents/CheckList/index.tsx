import React from 'react';
import { TTaskCheckList } from 'store/slice/task/entities';
import CheckItem from 'features/Tasks/currentTaskComponents/CheckList/CheckItem';
import ChecklistTitle from 'features/Tasks/currentTaskComponents/CheckList/ChecklistTitle';
import ChecklistProgress from 'features/Tasks/currentTaskComponents/CheckList/ChecklistProgress';
import styles from './index.module.scss';
import NewItem from 'features/Tasks/currentTaskComponents/CheckList/NewItem';
import { TaskFormSlice } from 'store/slice';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

type ChecklistProps = {
  checklist: TTaskCheckList;
  permissions: {
    changeChecklist: boolean,
    changeCheckbox: boolean,
  }
}

const Checklist = ({ checklist, permissions }: ChecklistProps) => {
  const dispatch = useDispatch();
  const completed = checklist.items?.filter((item) => item.complete).length;
  const countElement: number = checklist.items ? checklist.items?.length : 0;
  const percent = completed ? ((completed / countElement) * 100) : 0;
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const newIndex = checklist.items?.findIndex(
        (item) => item.check_list_item_id === active.id) || 0;
      const oldIndex = checklist.items?.findIndex(
        (item) => item.check_list_item_id === over?.id) || 0;
      if (checklist && checklist.items) {
        let afterId;
        if (newIndex < oldIndex) {
          afterId = over!.id;
        } else if (oldIndex === 0) {
          afterId = null;
        } else {
          afterId = checklist.items[oldIndex - 1].check_list_item_id;
        }
        dispatch(TaskFormSlice.swapItemInChecklist({
          checkListId: checklist.check_list_id,
          checkListItemIdOne: newIndex,
          checkListItemIdTwo: oldIndex,
        }));
        dispatch(TaskFormSlice.changePositionItemForChecklist({
          checkListId: checklist.check_list_id,
          checkListItemId: active.id,
          afterId,
        }));
      }
    }
  };
  const checklistIsLoadingStatus = useSelector(TaskFormSlice.checklistIsLoadingStatus);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
  );
  return (
    <div className={styles.checklist}>
      <ChecklistTitle checkList={checklist} canChange={permissions.changeChecklist} />
      <ChecklistProgress percent={percent} />
      <Spin spinning={checklistIsLoadingStatus}>
        {
        checklist.items && (
          <ul className={styles.list}>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={checklist.items.map((el) => el.check_list_item_id)}
                strategy={verticalListSortingStrategy}
              >
                {
                  checklist.items?.map((item) => (
                    <CheckItem
                      checklistId={checklist.check_list_id}
                      key={item.check_list_item_id}
                      item={item}
                      canChange={permissions.changeCheckbox}
                    />))
                }
              </SortableContext>
            </DndContext>

          </ul>
        )
      }
      </Spin>
      {
        permissions.changeCheckbox
        && <NewItem checklist={checklist} />
      }
    </div>
  );
};

export default Checklist;
