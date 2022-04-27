import { TTaskFormReducer } from 'store/slice/task/taskForm/fullTaskInfo/initialState';
import { PayloadAction } from '@reduxjs/toolkit';
import { changeStatusItemForChecklistProps } from '../checkList/entities';
import { TSwapItemInChecklist, TTask, TTaskCheckList, TTaskCheckListItem } from 'store/slice/task/entities';
import { arrayMove } from '@dnd-kit/sortable';

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
  removeItemFromCheckList: (state: TTaskFormReducer,
    { payload: data }: PayloadAction<pushItemForChecklistProps>) => {
    const checklist = state.task?.check_lists?.find((checklist) =>
      checklist.check_list_id === data.checkListId);
    if (checklist && checklist.items) {
      checklist.items = checklist.items.filter((item) =>
        item.check_list_item_id !== data.checklistItem.check_list_item_id);
    }
    return state;
  },
  updateTask: (state: TTaskFormReducer, { payload: data }: PayloadAction<TTask>) => {
    state.task = data;
    return state;
  },
  updateCheckList: (state: TTaskFormReducer, { payload: data }: PayloadAction<TTaskCheckList>) => {
    const checklist = state.task?.check_lists?.find(
      (checklist) => checklist.check_list_id === data.check_list_id);
    if (checklist && checklist.items) {
      checklist.items = data.items;
    }
    return state;
  },
  swapItemInChecklist: (state: TTaskFormReducer,
    { payload: data }: PayloadAction<TSwapItemInChecklist>) => {
    // eslint-disable-next-line no-unused-vars
    const checklist = state.task?.check_lists?.find(
      (checklist) => checklist.check_list_id === data.checkListId);
    let checklistItems = checklist && checklist.items ? [...checklist.items] : [];
    checklistItems = arrayMove(checklistItems, data.checkListItemIdOne, data.checkListItemIdTwo);
    if (checklist && checklist.items) {
      checklist.items = checklistItems;
    }
    return state;
  },
  setDescriptionFromTaskForm: (
    state: TTaskFormReducer,
    { payload: description }: PayloadAction<string>,
  ) => {
    state.task!.description = description;
    return state;
  },
};
