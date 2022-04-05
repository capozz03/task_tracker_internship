import { TUser } from '../user/entities';
import { RequestStatuses } from '../../../shared';

export type TTag = {
  task_tag_id: string,
  name: string,
  color: string
}

export type TStatus = {
  task_status_id: string,
  name: string,
  name_group?: string,
  form_result_required: boolean,
  created?: Date,
  updated?: Date
}

export type TPriority = {
  task_priority_id: string,
  name: string,
  created?: Date,
  updated?: Date
}

export type TTask = {
  task_id: string,
  title: string,
  description: string,
  exec_start?: Date | null,
  exec_stop?: Date | null,
  created?: Date,
  updated?: Date,
  status: TStatus,
  priority: TPriority | null,
  form: {
    name: string,
    fields: [
      {
        type: 'select',
        values: [
          {
            label: string,
            value: string
          }
        ],
        field_name: string,
        field_label: string
      }
    ]
  },
  form_available: boolean,
  form_result: any | null,
  roles: [
    {
      task_to_role_id: string,
      task: {
        task_id: string
      },
      task_role: {
        task_role_id: string,
        name: string,
        name_group: string,
        max_user_assigned: number,
        is_author: boolean,
        created: Date,
        updated: Date
      },
      'assign_user': TUser
    }
  ],
  tags: TTag[],
  progress: null,
  check_lists: any[],
  storage_files: any[],
  storage_files_meta: {
    total: 0
  },
  permissions: any[]
}

export type TTasksReducer = {
  task: null | TTask[],
  status: RequestStatuses,
  error: string | null
}
