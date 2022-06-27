type TArgs = {
  dispatch: any;
  status: string;
  state: any;
  slices: {
    TaskInboxSlice: any;
    TaskInWorkSlice: any;
    TaskCompletedSlice: any;
    TaskFailedSlice: any;
  }
};

export const updateTaskLists = ({ dispatch, status, state, slices }: TArgs) => {
  const {
    TaskInboxSlice,
    TaskInWorkSlice,
    TaskCompletedSlice,
    TaskFailedSlice,
  } = slices;

  const { taskFilters } = state;

  if (status === 'Создана') {
    const paginationInbox = state.taskInbox?.pagination;
    dispatch(
      TaskInboxSlice.getTasksAsync({
        per_page: paginationInbox!.per_page,
        page: paginationInbox!.page_current,
        ...taskFilters.filters,
      }),
    );
  }
  if (status === 'В работе') {
    const paginationInWork = state.taskInWork?.pagination;
    dispatch(
      TaskInWorkSlice.getTasksAsync({
        per_page: paginationInWork!.per_page,
        page: paginationInWork!.page_current,
        ...taskFilters.filters,
      }),
    );
  }
  if (status === 'Выполнена') {
    const paginationInCompleted = state.taskCompleted?.pagination;
    dispatch(
      TaskCompletedSlice.getTasksAsync({
        per_page: paginationInCompleted!.per_page,
        page: paginationInCompleted!.page_current,
        ...taskFilters.filters,
      }),
    );
  }
  if (status === 'Не выполнена') {
    const paginationInFailed = state.taskFailed?.pagination;
    dispatch(
      TaskFailedSlice.getTasksAsync({
        per_page: paginationInFailed!.per_page,
        page: paginationInFailed!.page_current,
        ...taskFilters.filters,
      }),
    );
  }
};
