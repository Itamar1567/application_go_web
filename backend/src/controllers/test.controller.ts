import { Request, Response } from "express";
import { test } from "../services/test.service";

export const getTest = async (req: Request, res: Response) => {
  try {
    const result = await test();
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to connect to api" });
  }
};
