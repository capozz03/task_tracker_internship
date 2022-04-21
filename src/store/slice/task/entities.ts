import { TUser } from '../user/entities';
import { RequestStatuses } from '../../../shared';
import { Priority } from 'features/Tasks/tasksComponents/PriorityStatus/constants';

export type TTag = {
  task_tag_id: string;
  name: string;
  color: string;
  created?: string;
  updated?: string;
};

export type TTagsTask = {
  task_to_tag_id: string;
  task: {
    task_id: string;
  };
  task_tag: TTag;
};

export type TStatus = {
  task_status_id: string;
  name: string;
  name_group?: string;
  form_result_required: boolean;
  created?: Date;
  updated?: Date;
};

export type TPriority = {
  task_priority_id: string;
  name: keyof typeof Priority;
  created?: Date;
  updated?: Date;
};

export type TRoles = {
  task_to_role_id: string;
  task: {
    task_id: string;
  };
  task_role: {
    task_role_id: string;
    name: string;
    name_group: string;
    max_user_assigned: number;
    is_author: boolean;
    created: string;
    updated: string;
  };
  assign_user: TUser;
};

type TTaskFormFieldValue = {
  label: string;
  value: string;
};

export type TTaskProgress = {
  completed: number;
  percent: number;
  total: number;
};

type TTaskFormField = {
  type: 'select';
  values: TTaskFormFieldValue[];
  field_name: string;
  field_label: string;
};

export type TTaskForm = {
  name: string;
  fields: TTaskFormField[];
};

export type TStorageFiles = {
  storage_file_id: string;
  type: string;
  name_original: string;
  content_type: string;
  size: number;
  uploaded: boolean;
  image_thumbnail: null;
  image_width: null;
  image_height: null;
  modifications: [];
};

export type TTask = {
  task_id: string;
  title: string;
  description: string;
  exec_start?: string | null;
  exec_stop?: string | null;
  created: string;
  updated: string;
  status: TStatus;
  priority: TPriority | null;
  form?: TTaskForm;
  form_available?: boolean;
  form_result?: any | null;
  roles: TRoles[];
  tags: TTagsTask[];
  progress: TTaskProgress | null;
  check_lists?: any[];
  storage_files?: TStorageFiles[];
  storage_files_meta: {
    total: number;
  };
  permissions: string[];
};

export type TPagination = {
  items_count: number;
  items_total: number;
  page_current: number;
  page_total: number;
  per_page: number;
};

export type TTasksReducer = {
  status: RequestStatuses;
  error: Error | null;
  tasks: TTask[] | null;
  pagination?: TPagination | null;
};

export type TTasksResponse = {
  data: TTask[] | null;
  pagination?: TPagination | null;
};

export type TTaskItemResponse = {
  data: TTask;
};

export type TTaskSearch = {
  sort?: 'date~DESC' | 'title~ASC';
  search?: string;
  assign_user_id?: string[];
  assigned_to_me?: true;
  storage_files_gte?: number;
  tag_id?: string[];
  role_id?: string[];
  role_id_for_me?: string[];
  priority_id?: string[];
  status_id?: string[];
  progress_gte?: string;
  relation_type?: string;
  relation_id?: string;
  page?: number;
  per_page?: number;
};

export type TTaskStatusChange = {
  task_id: string;
  task_status_id: string;
};

export type TSortType = 'date~DESC' | 'title~ASC';

export type TTaskCheckListItem = {
  check_list_item_id: string,
  message: string,
  complete: boolean,
  created: string,
  updated: string
};

export type TTaskCheckList = {
  check_list_id: string,
  title: string,
  created: string,
  updated: string,
  items?: TTaskCheckListItem[]
};
