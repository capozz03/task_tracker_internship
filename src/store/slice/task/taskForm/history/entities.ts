import { TStorageFiles } from 'store/slice/task/entities';
import { RequestStatuses } from 'shared';
import { TCommandCode } from 'store/slice/task/history/entities';

export type THistoryUnit = {
  history_command_id: string,
  command_code: TCommandCode,
  command_name: string,
  created: string,
  user: {
    user_id: string,
    name: string,
    logo?: string,
  },
  params: {
    task: {
      task_id: string,
      title: string,
    },
    task_from?: {
      task_id: string,
      title: string,
    },
    task_to?: {
      task_id: string,
      title: string,
    },
    tag?: {
      task_tag_id: string,
      name: string,
      color: string,
    },
    priority?: null | {
      task_priority_id: string,
      name: string,
    },
    exec_start?: string | null,
    exec_stop?: string | null,
    status?: {
      task_status_id: string,
      name: string,
    },
    storage_file?: TStorageFiles,
    message?: string,
    check_list?: {
      check_list_id: string,
      title: string,
    }
    check_list_item?: {
      check_list_item_id: string,
      message: string,
    }
    complete?: boolean,
    title?: string,
    description?: string,
    after?: null | {
      check_list_item_id: string,
      message: string,
    },
    assign_user?: {
      user_id: string,
      name: string,
    },
    task_role?: {
      task_role_id: string,
      name: string,
    },
    form_result?: Array<
      {
        value: string,
        field_name: 'resume' | 'comment',
      }
    >,
  },
  relations: [
    {
      relation_type: string,
      relation_id: string,
      relation: {
        relation_id: string,
        title: string,
      }
    },
  ]
};

export type TStateData = {
  pagination: {
    items_count: number,
    items_total: number,
    per_page: number,
    page_current: number,
    page_total: number
  },
  data: THistoryUnit[];
};

export type TState = {
  data: TStateData;
  status: RequestStatuses;
  error: Error | null;
};

export type TTaskHistoryProps = {
  taskId: string;
  page: number;
  limit: number;
}
