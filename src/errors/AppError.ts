import EStatusCode from "../@types/EStatusCode"

export class AppError extends Error {
  public readonly statusCode: EStatusCode;

  public constructor(statusCode: EStatusCode, message: string){
    super(message);
    this.statusCode = statusCode;
  }
}
