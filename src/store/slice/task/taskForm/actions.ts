import { TTaskFormReducer } from './initialState';

export const taskFormActions = {
  setTitleFromTaskForm(state: TTaskFormReducer, payload: string) {
    return {
      ...state,
      task: {
        ...state.task,
        title: payload,
      },
    };
  },
  toggleVisibleTaskForm(state: TTaskFormReducer) {
    return {
      ...state,
      isVisibleForm: !state.isVisibleForm,
    };
  },
};
