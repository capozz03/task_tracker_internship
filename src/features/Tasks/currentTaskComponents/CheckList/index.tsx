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
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { RequestStatuses } from 'shared';

type ChecklistProps = {
  checklist: TTaskCheckList;
}

const Checklist = ({ checklist }: ChecklistProps) => {
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
        let afterId: string | null = '0';
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
  const statusChecklist = useSelector(TaskFormSlice.checklistStatus);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  return (
    <div className={styles.checklist}>
      <ChecklistTitle checkList={checklist} />
      <ChecklistProgress percent={percent} />
      <Spin spinning={statusChecklist === RequestStatuses.LOADING}>
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
                    />))
                }
              </SortableContext>
            </DndContext>

          </ul>
        )
      }
      </Spin>
      <NewItem checkListId={checklist.check_list_id} />
    </div>
  );
};

export default Checklist;
