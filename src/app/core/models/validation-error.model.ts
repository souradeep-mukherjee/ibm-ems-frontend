export type ValidationError = Record<string, string>;

export interface HttpErrorViewModel {
  status: number;
  message: string;
  validationErrors?: ValidationError;
}
