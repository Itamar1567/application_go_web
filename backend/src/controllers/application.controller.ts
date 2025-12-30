import type { Response, Request } from "express";
import {
  addApplicationByUserId,
  changeApplicationByUserId,
  removeApplicationByUserId,
  retrieveAllApplicationsByUserId,
} from "../services/applicaiton.service";
import { getAuth } from "@clerk/express";

export const createApplicationByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = getAuth(req);

    const result = await addApplicationByUserId(userId as string, req.body);

    return res.json({success: true, result, message: "Application Added To Cataloge"});
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
    const { userId } = getAuth(req);

    const applications = await retrieveAllApplicationsByUserId(userId as string);
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
    const { userId } = getAuth(req);

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const result = await removeApplicationByUserId(userId as string, id);
    return res.json({ success: true, result, message: "Application succesfully deleted"});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Could not delete application" });
  }
};

export const updateApplicationByUserId = async (
  req: Request,
  res: Response
) => {
  const { userId } = getAuth(req);
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const result = await changeApplicationByUserId(userId as string, id, req.body);
  return res.json({ success: true, result, message: "Application Updated" });
};
