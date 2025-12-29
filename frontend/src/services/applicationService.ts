import type {
  ToCreateApplication,
  ToGetApplication,
  ToUpdateApplication,
} from "../interfaces/ToDoApplication";

const applicationsUrl: string = "http://localhost:3000/api/applications";

export const fetchUserApplications = async (
  token: string | null
): Promise<ToGetApplication[]> => {
  try {
    if (token === null) {
      throw new Error("Invalid token");
    }
    const res = await fetch(applicationsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
  token: string,
  application: ToCreateApplication
): Promise<boolean> => {
  try {
    if (token === null) {
      throw new Error("Invalid token");
    }
    const res = await fetch(applicationsUrl, {
      method: "POST",
      body: JSON.stringify(application),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

export const deleteUserApplication = async (
  token: string,
  id: number
): Promise<boolean> => {
  try {
    if (token === null) {
      throw new Error("Invalid token");
    }
    const res = await fetch(`${applicationsUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
  token: string,
  id: number,
  updateApp: ToUpdateApplication
): Promise<boolean> => {
  try {
    if (token === null) {
      throw new Error("Invalid token");
    }
    const res = await fetch(`${applicationsUrl}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateApp),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
