import { TFormResult, TTask } from '../../entities';

export type TFormResultChangeResponse = {
  data: TTask;
};

export type TFormResultChangeProps = {
  form_result: {
    taskId: string;
    formResult: TFormResult[];
  };
};
