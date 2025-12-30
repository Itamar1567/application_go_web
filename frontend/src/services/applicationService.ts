import type {
  ToCreateApplication,
  ToGetApplication,
  ToUpdateApplication,
} from "../interfaces/ToDoApplication";

const applicationsUrl: string = "/api/applications";

//This is intended for development use only!
// const applicationsUrlDev: string = "http://localhost:3000/api/applications";

//Function to validate json response
export async function validateResponse(res: Response) {

  if (!res.ok) {

    try {
      const err = await res.json();
      throw new Error(err.message || "Server responded with an error");
    } catch {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
  }

  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    throw new Error("Expected JSON, got something else (bad URL or server down");
  }

}

export const fetchUserApplications = async (
  token: string | null
): Promise<ToGetApplication[]> => {
  try {
    const res = await fetch(applicationsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await validateResponse(res);
    

    return res.json() as Promise<ToGetApplication[]>;
  } catch (err) {
    console.error("Failed fetching data");
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

    await validateResponse(res);

    return res.json();
  } catch (err) {
    console.error("Failed to add data");
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

    await validateResponse(res);

    return res.json();
  } catch (err) {
    console.error("Failed to delete data");
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

    await validateResponse(res);

    return res.json();
  } catch (err) {
    console.error("Failed to update data");
    throw err;
  }
};
