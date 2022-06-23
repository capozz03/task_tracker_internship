import { TCommandCode } from 'store/slice/task/history/entities';
import { TPagination, TStorageFiles, TTag } from 'store/slice/task/entities';
import { TUser } from 'store/slice/user/entities';
import { RequestStatuses } from 'shared';

export type TNotifiesRequest = {
  viewed?: boolean | null;
  include?: string[];
  page: number;
  per_page: number;
}

type isoDate = string;

type formResultType = {
  field_name: string;
  value: string;
}

export type TNotification = {
  subscribe_notify_id: string;
  viewed: boolean;
  history_command: {
    history_command_id: string;
    command_code: TCommandCode;
    command_name: string;
    created: string;
    user: TUser;
    params: {
      storage_file?: TStorageFiles;
      task: {
        task_id: string;
        title: string;
      },
      task_role?: {
        task_role_id: string;
        name: string;
      },
      assign_user?: TUser;
      title?: string;
      status?: {
        task_status_id: string;
        name: string;
      },
      exec_start?: isoDate;
      exec_stop?: isoDate;
      tag?: TTag;
      priority?: {
        task_priority_id: string;
        name: 'Высокий' | 'Средний' | 'Низкий' | null;
      },
      form_result?: formResultType[],
      check_list?: {
        check_list_id: string;
        title: string;
      },
      check_list_item?:{
        check_list_item_id: string,
        message: string,
      },
      message?: string;
      complete?: boolean;
      task_from?: {
        task_id: string,
        title: string,
      },
      task_to?: {
        task_id: string,
        title: string,
      },
    },
    relations: [
      {
        relation_type: string;
        relation_id: string;
        relation: {
          relation_id: string;
          title: string;
        }
      }
    ]
  }
}

export type TNotificationReducer = {
  notifications: TNotification[];
  pagination: TPagination;
  isVisible: boolean,
  status: RequestStatuses;
  error: null | Error;
}

export type TNotificationsResponse = {
  pagination: TPagination;
  data: TNotification[];
}

export type TChangeViewerRequest = {
  viewed: boolean;
  subscribe_notify_id: string[];
}

export type TToggleReadStatusProps = {
  listNotificationId: string[];
  status?: boolean;
}
