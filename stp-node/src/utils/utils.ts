import { Response } from "express";

export function handleError(res: Response, error: unknown, msg: string) {
  if (error instanceof Error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  } else {
    return res.status(500).json({ error: "Internal server error." });
  }
}

export function validateId(id: string, res: Response) {
    if (!id) {
      return res.status(400).json({ error: "Id is required" });
    }
  }