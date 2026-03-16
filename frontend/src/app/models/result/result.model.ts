export interface Result<T> {
  success: boolean;
  statusCode: number;
  errors: string[] | null;
  data: T | null;
}
