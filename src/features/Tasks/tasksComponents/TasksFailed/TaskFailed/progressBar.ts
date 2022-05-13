export type ProgressType = {
  total: number;
  checked: number;
};

export const progress: ProgressType = {
  total: 5,
  checked: 3,
};

export const progressBarPercent = (progress: ProgressType) =>
  (progress.checked / progress.total) * 100;
