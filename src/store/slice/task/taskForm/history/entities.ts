import { RequestStatuses } from 'shared';

export type THistoryUnit = {
  history_command_id: string,
  command_code: string,
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
    storage_file?: {
      name_original: string,
    }
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
    }
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

export type TState = {
  data: THistoryUnit[] | null;
  status: RequestStatuses;
  error: Error | null;
};
