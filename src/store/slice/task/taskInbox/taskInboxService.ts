import { $apiTask } from 'shared';
import { TTask, TTaskStatusChange } from '../entities';

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUiLCJpYXQiOjE2NDkwNjUxOTB9.UdThCYVM3JIbqrK8Qtet41vdZlNH4hV4SiJUsahPkeC_-VkZ5VFukHRuCBwxZ4AP9FgxFGb94YDCq52iRBo1qI33tJSeJtEGQhHtuR4aMnL285ONup-Vg77BV6VXRpH6djzQi7vzvDdr4L3SsE3irUvM9I-RuO3wMIGQIaSdqFhX_9KsVg5UmfWxiV6MtXWV8rCWjGvnlAw3YcEtSV3ddrVO1benTNe-r8GD4dfJdAobCVJWbnhLDJRCM7znRM8OGERsH1oUl8mWm6FZqGAovSTFbDqf568wl3cp6K-t_71RikYriyZDA4mxs9XwD-4IGZBPETEsHOPswrMZbL83qAxj_c9QYYXGD0jnRXtmHySRnvZttqlwW0m-SbjNTWb5LTWf0xnMPt6_ydt2-Mn0cG0JiPYGsiA6AwpXhiZlQJYUvOz3s42X1AzHiuZauj5B9qBZBwXc4dD0y55P5kSDM4hd9fm3V7s-rXbStPVGFih5mWmcbBGGKPVGo26hOMqH_9Rla8Kz4fb31rS5yM8NqIADcDVtJdNLEYuCpW1D0ZFNK8rBTxNoRtb_EI-ma5Q_jMTCRSm35quR8uKWrPzI25HuyPF2vIxffKPvKzZJ2GNmgm8ynkcQtEg2uwZ_eFLQhRvXntcQsYYeYSYLq-AXVERaZMBsM55-kc6FAf6_5TM';

export const taskService = {
  getTasks: async (params?: any) => $apiTask.get<TTask[]>('/api/v1.0/task/tasks', {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  changeStatusTask: async ({
    task_id: taskId,
    task_status_id: taskStatusId }: TTaskStatusChange) =>
    $apiTask.post<TTask[]>(`/api/v1.0/task/tasks/${taskId}/status-change`,
      { task_status_id: taskStatusId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),
};
