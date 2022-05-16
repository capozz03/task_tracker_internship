import { TCommandCode } from 'store/slice/task/history/entities';
import { TPagination, TStorageFiles } from 'store/slice/task/entities';
import { TUser } from 'store/slice/user/entities';

export type TNotifiesRequest = {
  viewed: boolean | null;
  include: string[];
  page: number;
  per_page: number;
}

export type TNotification = {
  subscribe_notify_id: string;
  viewed: false;
  history_command: {
    history_command_id: string;
    command_code: TCommandCode;
    command_name: string;
    created: string;
    user: TUser;
    params: {
      storage_files: TStorageFiles;
      task: {
        task_id: string;
        title: string;
      }
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

export type TNotificationsResponse = {
  pagination: TPagination;
  data: TNotification[];
}

export type TChangeViewerRequest = {
  viewed: boolean;
  subscribe_notify_id: string[];
}
