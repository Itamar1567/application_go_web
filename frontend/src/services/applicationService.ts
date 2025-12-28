import type {
  ToCreateApplication,
  ToGetApplication,
  ToUpdateApplication,
} from "../interfaces/ToDoApplication";

const applicationsUrl: string = "http://localhost:3000/api/applications";

export const fetchUserApplications = async (): Promise<ToGetApplication[]> => {
  try {
    const res = await fetch(applicationsUrl + "?userId=testuser_1");

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    console.log("Succesfully fetched applications: ");
    return res.json() as Promise<ToGetApplication[]>;
  } catch (err) {
    console.log(err, "Failed to fetch applications");
    throw err;
  }
};

export const sendNewUserApplication = async (
  application: ToCreateApplication
): Promise<boolean> => {
  try {
    const res = await fetch(applicationsUrl + "?userId=testuser_1", {
      method: "POST",
      body: JSON.stringify(application),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    console.log(res);
    return true;
  } catch (err) {
    console.log(err, "Failed to send application");
    throw err;
  }
};

export const deleteUserApplication = async (id: number): Promise<boolean> => {
  try {
    const res = await fetch(`${applicationsUrl}/${id}?userId=testuser_1`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    console.log(res);
    return true;
  } catch (err) {
    console.log(err, "Failed to delete application");
    throw err;
  }
};

export const updateUserApplication = async (
  id: number,
  updateApp: ToUpdateApplication
): Promise<boolean> => {
  try {
    const res = await fetch(`${applicationsUrl}/${id}?userId=testuser_1`, {
      method: "PATCH",
      body: JSON.stringify(updateApp),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    return true;
  } catch (err) {
    console.log(err, "Failed to update application");
    throw err;
  }
};
