export type TCommandCode = 'task.role_assign'
                         | 'subscribe.notify_create'
                         | 'task.check_list_assign'
                         | 'task.create'
                         | 'task.form_set'
                         | 'subscribe.subscribe_create'
                         | 'task.delete'
                         | 'task.description_change'
                         | 'task.role_un_assign'
                         | 'task.title_change'
                         | 'task.status_change'
                         | 'task.exec_start_change'
                         | 'task.exec_stop_change'
                         | 'task.tag_assign'
                         | 'task.tag_un_assign'
                         | 'task.priority_change'
                         | 'task.check_list_un_assign'
                         | 'task.form_result_change'
                         | 'task.storage_file_assign'
                         | 'task.storage_file_un_assign'
                         | 'task.clone'
                         | 'check_list.item_change_complete'
                         | 'check_list.item_create'
                         | 'check_list.item_delete'
                         | 'check_list.item_change_message'
                         | 'check_list.item_position_set'
                         | 'check_list.title_change'
                         | 'storage.storage_file_upload'
                         | 'check_list.create'
                         | 'storage.storage_file_create'
                         | 'subscribe.notify_viewed_change'
                         | 'subscribe.subscribe_delete'

export type TCommand = {
  code: TCommandCode;
  name: string;
}

export type TSubscribeList = {
  subscribe_id: string;
  command_code: string | null;
  relation_type: 'task' | 'storage' | 'check-list';
  relation_id: string;
  created: string;
}
