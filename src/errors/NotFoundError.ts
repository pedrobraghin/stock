import { AppError } from "./AppError";
import EStatusCode from '../@types/EStatusCode'


export class NotFoundError extends AppError {
  constructor(message: string) {
    super(EStatusCode.NOT_FOUND, message)
  }
}