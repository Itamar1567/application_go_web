// useApplicationService.ts
import { useAuth } from "@clerk/clerk-react";
import {
  fetchUserApplications as _fetchUserApplications,
  sendNewUserApplication as _sendNewUserApplication,
  deleteUserApplication as _deleteUserApplication,
  updateUserApplication as _updateUserApplication,
} from "../services/applicationService";
import type { ToCreateApplication, ToUpdateApplication } from "../interfaces/ToDoApplication";

export function useApplicationService() {
  const { getToken } = useAuth();

  const fetchUserApplications = async () => {
            

    const token = await getToken();
    
    if (!token) throw new Error("No auth token");
    
    return await _fetchUserApplications(token);
  };

  const sendNewUserApplication = async (app: ToCreateApplication) => {
    const token = await getToken();
    if (!token) throw new Error("No auth token");
    return await _sendNewUserApplication(token, app);
  };

  const deleteUserApplication = async (id: number) => {
    const token = await getToken();
    if (!token) throw new Error("No auth token");
    return await _deleteUserApplication(token, id);
  };
  
  const updateUserApplication = async (id: number, app: ToUpdateApplication) => {
    const token = await getToken();
    if (!token) throw new Error("No auth token");
    return await _updateUserApplication(token, id, app);
  };

  return {
    fetchUserApplications,
    sendNewUserApplication,
    deleteUserApplication,
    updateUserApplication,
  };
}