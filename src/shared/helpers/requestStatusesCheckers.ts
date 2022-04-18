import { RequestStatuses } from './enums';

export const isIdleStatusCheck = (status: any) => status === RequestStatuses.IDLE;
export const isLoadingStatusCheck = (status: any) => status === RequestStatuses.LOADING;
export const isSuccessStatusCheck = (status: any) => status === RequestStatuses.SUCCESS;
export const isFailureStatusCheck = (status: any) => status === RequestStatuses.FAILURE;
