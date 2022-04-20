import { TTaskFormReducer } from 'store/slice/task/taskForm/fullTaskInfo/initialState';
import { PayloadAction } from '@reduxjs/toolkit';
import { changeStatusItemForChecklistProps } from '../checkList/entities';
import { TTaskCheckListItem } from 'store/slice/task/entities';

type pushItemForChecklistProps = {
  checkListId: string,
  checklistItem: TTaskCheckListItem,
}

export const taskFormActions = {
  showTaskForm: (state: TTaskFormReducer) => {
    state.isVisibleForm = true;
    return state;
  },
  hiddenTaskForm: (state: TTaskFormReducer) => {
    state.isVisibleForm = false;
    state.task = null;
    return state;
  },
  setTitleFromTaskForm: (state: TTaskFormReducer, { payload: title }: PayloadAction<string>) => {
    state.task!.title = title;
    return state;
  },
  changeStatusItemForChecklistTaskForm: (state: TTaskFormReducer,
    { payload: data }: PayloadAction<changeStatusItemForChecklistProps>) => {
    const checklist = state.task?.check_lists?.find((checklist) =>
      checklist.check_list_id === data.checkListId);
    if (checklist) {
      const item = checklist.items?.find((item) =>
        item.check_list_item_id === data.checkListItemId);
      if (item) {
        item.complete = data.complete;
      }
    }
    return state;
  },
  pushItemForCheckList: (state: TTaskFormReducer,
    { payload: data }: PayloadAction<pushItemForChecklistProps>) => {
    const checklist = state.task?.check_lists?.find((checklist) =>
      checklist.check_list_id === data.checkListId);
    if (checklist && checklist.items) {
      const newItem = data.checklistItem;
      checklist.items.push(newItem);
    }
    return state;
  },
};
