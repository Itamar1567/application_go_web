import type { Response, Request } from "express";
import {
  addApplicationByUserId,
  changeApplicationByUserId,
  removeApplicationByUserId,
  retrieveAllApplicationsByUserId,
} from "../services/applicaiton.service";

export const createApplicationByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const result = await addApplicationByUserId(userId, req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to add application" });
  }
};

export const getAllApplicationsByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const applications = await retrieveAllApplicationsByUserId(userId);
    return res.json(applications);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Could not fetch user applications" });
  }
};

export const deleteApplicationByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.query.userId as string;
    const id = Number(req.params.id);

    console.log(userId); // comes back as number;

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const result = await removeApplicationByUserId(userId, id);
    return res.json({ success: true, result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Could not delete application" });
  }
};

export const updateApplicationByUserId = async (
  req: Request,
  res: Response
) => {
  const userId = req.query.userId as string;
  const id = Number(req.params.id);

  console.log(userId); // comes back as number;

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  const result = await changeApplicationByUserId(userId, id, req.body);
  return res.json({success: true , result});
};
