/* eslint-disable no-unused-vars */
export enum RequestStatuses {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export enum TaskStatuses {
  CREATED = 'cbb7199e-cb25-4dce-bf4e-24a8a5e07ef2',
  IN_WORK = '372d63ff-3ae3-4be2-a606-38940d7f8c8f',
  COMPLETED = '8536592a-7340-4e10-ac4b-a280652c9310',
  FAILED = '599f5d03-1ef0-4a5b-a18c-33a4f44c4610',
  REJECTED = '4658859a-32a6-4206-838a-c0064f147299',
}

export enum RolesIds {
  AUTHOR = '4601c660-f319-4728-80a6-0aaac03f3842',
  OBSERVER = '25615bc6-9762-4578-b1d9-de28a059d682',
  PERFORMER = '4fca475d-488e-4261-8e60-44569071a038',
  RESPONSIBLE = '57a5360b-7c3b-4de0-b536-a5657ac7da32',
}

export enum RoleMaxAmounts {
  OBSERVER = 10,
  PERFORMER = 1,
  RESPONSIBLE = 1,
}
