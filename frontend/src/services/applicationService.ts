import type {
  ToCreateApplication,
  ToGetApplication,
  ToUpdateApplication,
} from "../interfaces/ToDoApplication";

const applicationsUrl: string = "/api/applications";

export const fetchUserApplications = async (
  token: string | null
): Promise<ToGetApplication[]> => {
  try {
    const res = await fetch(applicationsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error);
    }

    console.log("Succesfully fetched applications: ");
    
    return res.json() as Promise<ToGetApplication[]>;
  } catch (err) {
    throw err;
  }
};

export const sendNewUserApplication = async (
  token: string,
  application: ToCreateApplication
) => {
  try {
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

    return res.json();
  } catch (err) {
    throw err;
  }
};

export const deleteUserApplication = async (token: string, id: number) => {
  try {
    const res = await fetch(`${applicationsUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error);
    }

    return res.json();
  } catch (err) {
    throw err;
  }
};

export const updateUserApplication = async (
  token: string,
  id: number,
  updateApp: ToUpdateApplication
) => {
  try {
    const res = await fetch(`${applicationsUrl}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateApp),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error);
    }

    return res.json();
  } catch (err) {
    throw err;
  }
};
