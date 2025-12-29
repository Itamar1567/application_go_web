// useApplicationService.ts
import { useAuth } from "@clerk/clerk-react";
import {
  fetchUserApplications as _fetchUserApplications,
  sendNewUserApplication as _sendNewUserApplication,
} from "../services/applicationService";
import type { ToCreateApplication } from "../interfaces/ToDoApplication";

export function useApplicationService() {
  const { getToken } = useAuth();

  const fetchUserApplications = async () => {
    const token = await getToken();
    if (!token) throw new Error("No auth token");
    return _fetchUserApplications(token);
  };

  const sendNewUserApplication = async (app: ToCreateApplication) => {
    const token = await getToken();
    if (!token) throw new Error("No auth token");
    //return _sendNewUserApplication(token, app);
  };

  return {
    fetchUserApplications,
    sendNewUserApplication,
  };
}