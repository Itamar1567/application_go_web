import { ResultSetHeader } from "mysql2";
import { dbConnection } from "../config/db";
import type { ToDoApplication } from "../models/application";


function camelToSnake(name: string){
    //Replaced any capital letter between A - Z with _(And the lower case version of that index's value)
    return name.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

}

export const addApplicationByUserId = async (
  userId: string,
  app: ToDoApplication
) => {
  try {
    const currDate = new Date().toISOString().split("T")[0];

    const [result] = await dbConnection.execute(
      `
        INSERT INTO user_applications_tb
        (
        company_name,
        user_id,
        role,
        location,
        company_url,
        date_applied,
        status,
        state,
        country,
        type,
        salary
        )
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
        `,
      [
        app.companyName,
        userId,
        app.role ?? null,
        app.location,
        app.companyUrl ?? null,
        app.dateApplied ?? currDate,
        app.status ?? 0,
        app.state ?? null,
        app.country ?? null,
        app.type,
        app.salary ?? null,
      ]
    );
    return result;
  } catch (err) {
    console.log(err, "Failed to add application to db");
    return "Failed to add application to db";
  }
};

export const retrieveAllApplicationsByUserId = async (userId: string) => {
  try {
    const [rows] = await dbConnection.query(
      "SELECT id, company_name as companyName, status, type, DATE (date_applied) as dateApplied , DATE (last_updated) as lastUpdated , location, role, country, state, salary, company_url as companyUrl FROM user_applications_tb WHERE user_id = ?",
      [userId]
    );

    return rows as ToDoApplication[];
  } catch (err) {
    console.log(err, "Could not get user applications from db");
    return "Could not get user applications from db";
  }
};

export const removeApplicationByUserId = async (userId: string, id: number) => {
  try {
    console.log("Deleting", userId, id);
    const [result] = await dbConnection.execute<ResultSetHeader>(
      "DELETE FROM user_applications_tb WHERE user_id = ? AND id = ?",
      [userId, id]
    );

    console.log("Query result:", result);

    if (result.affectedRows === 0) {
      return "No rows deleted";
    } else {
      return result;
    }
  } catch (err) {
    console.log(err);
    return "Could not delete application from db";
  }
};

export const changeApplicationByUserId = async(
  userId: string,
  id: number,
  changedValues: ToDoApplication
) => {

  try{

  const keys = Object.keys(changedValues) as (keyof ToDoApplication)[];
  const fieldsToUpdate = keys.filter((key) => changedValues[key] !== undefined);

  if (fieldsToUpdate.length === 0) {
    return { message: "No fields to update" };
  }

  //Set query names top to bottom
  const setQuery = fieldsToUpdate.map(key => `${camelToSnake(key)} = ?`).join(", ");

  //Set values top to bottom
  const values = fieldsToUpdate.map(key => changedValues[key]);
  values.push(userId, id)

  const sql = `UPDATE user_applications_tb SET ${setQuery} WHERE user_id = ? AND id = ?`;

  const [result] = await dbConnection.execute(sql, values);
    
  return result;
}
catch(err){
  console.log(err);
  return "Could not change applicaiton";
}
};
