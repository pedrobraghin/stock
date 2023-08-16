import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import EStatusCode from "../@types/EStatusCode";

export async function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error)
  if (error instanceof AppError) {
    return res.status(error.statusCode).json(error.message)
  }

  res
    .status(EStatusCode.INTERNAL_SERVER_ERROR)
    .json("Something went wrong. Please try again");
}
