export const getTime = (start?: string, _default = Number.MAX_SAFE_INTEGER) =>
  start ? new Date(start).getTime() : _default
