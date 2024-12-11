export enum ErrorCode {
  Unknown = 'Unknown',
  InternalServerError = 'InternalServerError',
  BadRequest = 'BadRequest',
  Unauthorized = 'Unauthorized',
  UserNotFound = 'UserNotFound',
  DuplicateEmail = 'DuplicateEmail'
}

export function toErrorCode(value: string): ErrorCode {
  if (Object.values(ErrorCode).includes(value as ErrorCode)) {
    return value as ErrorCode;
  }
  return ErrorCode.Unknown;
}
