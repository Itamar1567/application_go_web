import { useState } from "react";
import "./add_application.css";
import type { ToCreateApplication } from "../interfaces/ToDoApplication";
import RequiredField from "./required_field";
import { useApplicationService } from "../hooks/useApplicationService";

function AddApplication() {

  const { sendNewUserApplication } = useApplicationService();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setApplication((prev) => ({ ...prev, [name]: value }));
  };

  const [application, setApplication] = useState<ToCreateApplication>({
    companyName: "",
    role: "",
    status: 0,
    location: 0,
    type: 0,
  });

  const defaultValuesForApplication: ToCreateApplication = {
    companyName: "",
    role: "",
    status: 0,
    location: 0,
    type: 0,
    dateApplied: undefined,
    country: undefined,
    state: undefined,
    salary: undefined,
    companyUrl: undefined,
  };

  type ReqInputFields = "companyName" | "role";

  const [reqInputFieldErr, setReqInputFieldErr] = useState<
    Record<ReqInputFields, boolean>
  >({
    companyName: false,
    role: false,
  });

  //"Enums (Inorder to cycle buttons with a specifc Index, value(s) pair)and related functions"

  const statusEnum = [
    { text: "Applied", color: "#47f559" },
    { text: "Interviewed", color: "#ecff3d" },
    { text: "Accepted", color: "#e710c3ff" },
    { text: "Rejected", color: "#e01313ff" },
  ];

  const typeEnum = [
    { text: "Full-Time", color: "#d7ff25ff" },
    { text: "Part-Time", color: "#6a85ffff" },
    { text: "Internship", color: "#f34dddff" },
    { text: "Contract", color: "#00d3f8ff" },
  ];
  const locationEnum = [
    { text: "OnSite", color: "#6f72ffff" },
    { text: "Hybrid", color: "#3dfd24ff" },
    { text: "Remote", color: "#f8be00ff" },
  ];

  function cycleEnums(
    field: "status" | "type" | "location",
    enumLength: number
  ) {
    setApplication((prev) => ({
      ...prev,
      [field]: (prev[field] + 1) % enumLength,
    }));
  }

  //end "enums"

  const normalizeSalary = (value: string | number | undefined | null) => {
  if (value === undefined || value === null || value === "") {
    return undefined; // send NULL to the database
  }

  const num = Number(value);
  return isNaN(num) ? undefined : num;
};

  //Thie function Validates that all required input is provided
  const validateApplicationSubmission = (): ToCreateApplication | null => {

    //Use a map("Record") to dynamically change validity of required inputs

    const errors: Record<ReqInputFields, boolean> = {
    companyName: !application.companyName.trim(),
    role: !application.role.trim(),};

    setReqInputFieldErr(errors);

    const isError = Object.values(errors).some((v) => v);
    if(isError) { return null; }

    //Make salary valid if empty (may change this handler later) 
    const cleanApplication: ToCreateApplication = { ...application, salary: normalizeSalary(application.salary) }

    return cleanApplication;
  };

  const createApplication = async () => {
    const validApplication = validateApplicationSubmission();
    if (!validApplication) {
      return;
    } else {
      try{
        const data = await sendNewUserApplication(validApplication);
        resetInputsOnApplicationCreation(); 
        alert(data.message);
      }catch(err: any){
        alert(err.message);
      }
    }
  };

  const resetInputsOnApplicationCreation = () => {
    setApplication(defaultValuesForApplication);
    window.scrollTo(0, 0);
  };


  return (
    <div className="clean-app-main">
      <h1>Create New Application</h1>

      <ul className="clean-app-main-required-ul">
        <li>
          {reqInputFieldErr.companyName && (
            <RequiredField text="You must provide a company name" />
          )}
          <p>*Company Name: </p>
          <input
            value={application.companyName ?? ""}
            name="companyName"
            placeholder="Ex: Google"
            onChange={handleChange}
          ></input>
        </li>
        <li>
          {reqInputFieldErr.role && (
            <RequiredField text="You must provide a role" />
          )}
          <p>*Role:</p>
          <input
            value={application.role ?? ""}
            name="role"
            placeholder="Ex: Software Engineer"
            onChange={handleChange}
          ></input>
        </li>
        <li>
          <p>*Type: </p>
          <button
            className="submission-btn"
            onClick={() => cycleEnums("type", typeEnum.length)}
            style={{ backgroundColor: typeEnum[application.type].color }}
          >
            {" "}
            {typeEnum[application.type].text}{" "}
          </button>
        </li>
        <li>
          <p>*Location: </p>
          <button
            className="submission-btn"
            onClick={() => cycleEnums("location", locationEnum.length)}
            style={{
              backgroundColor: locationEnum[application.location].color,
            }}
          >
            {" "}
            {locationEnum[application.location].text}{" "}
          </button>
        </li>
        <li>
          <p>*Status: </p>
          <button
            className="submission-btn"
            onClick={() => cycleEnums("status", typeEnum.length)}
            style={{ backgroundColor: statusEnum[application.status].color }}
          >
            {" "}
            {statusEnum[application.status].text}{" "}
          </button>
        </li>
      </ul>
      <hr className="solid"></hr>
      <h3>Extra Details</h3>
      <div className="extra-details">
      <ul className="bottom-ul">
        <li>
          <p>Country: </p>
          <input
            value={application.country ?? ""}
            name="country"
            placeholder="Ex: Spain"
            onChange={handleChange}
          ></input>
        </li>
        <li>
          <p>State: </p>
          <input
            value={application.state ?? ""}
            name="state"
            placeholder="Ex: California"
            onChange={handleChange}
          ></input>
        </li>
        <li>
          <p>Date Applied: </p>
          <input
            type="date"
            min="1900-01-01"
            max="3000-01-01"
            value={application.dateApplied ?? ""}
            name="dateApplied"
            placeholder="Ex: Year-Month-Day"
            onChange={handleChange}
          ></input>
        </li>
        <li>
          <p>Salary: </p>
          <input
            value={application.salary ?? ""}
            type="number"
            name="salary"
            placeholder="Ex: 75000"
            onChange={handleChange}
          ></input>
        </li>
        <li>
          <p>Posting Url: </p>
          <input
            type="url"
            value={application.companyUrl ?? ""}
            name="companyUrl"
            placeholder="Ex: https://www.example.com"
            onChange={handleChange}
          ></input>
        </li>
      </ul>
      </div>
      <hr className="solid"></hr>
      <button className="add-application-btn" onClick={createApplication}>
        Create Application
      </button>
    </div>
  );
}

export default AddApplication;
