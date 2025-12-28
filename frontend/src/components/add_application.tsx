import { useEffect, useState } from "react";
import "./add_application.css";
import type { ToCreateApplication } from "../interfaces/ToDoApplication";
import RequiredField from "./required_field";
import { sendNewUserApplication } from "../services/applicationService";

function AddApplication() {
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

  //"Enums and related functions"

  const statusEnum = [
    { text: "Applied", color: "#47f559" },
    { text: "Interviewed", color: "#ecff3d" },
    { text: "Accepted", color: "#e710c3ff" },
    { text: "Rejected", color: "#e01313ff" },
  ];

  const typeEnum = [
    { text: "Full-Time", color: "#d7ff25ff" },
    { text: "Part-Time", color: "#1c44f5ff" },
    { text: "Internship", color: "#f34dddff" },
    { text: "Contract", color: "#00d3f8ff" },
  ];
  const locationEnum = [
    { text: "OnSite", color: "#1519faff" },
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

  //tech debt ):
  const validateApplicationSubmission = (): ToCreateApplication | null => {
    if (!application.companyName.trim() || !application.role.trim()) {
      if (!application.companyName.trim()) {
        setReqInputFieldErr((prev) => ({ ...prev, companyName: true }));
      } else {
        setReqInputFieldErr((prev) => ({ ...prev, companyName: false }));
      }

      if (!application.role.trim()) {
        setReqInputFieldErr((prev) => ({ ...prev, role: true }));
      } else {
        setReqInputFieldErr((prev) => ({ ...prev, role: false }));
      }

      return null;
    }

    setReqInputFieldErr((prev) => ({ ...prev, companyName: false }));
    setReqInputFieldErr((prev) => ({ ...prev, role: false }));
    return application;
  };

  const createApplication = async () => {
    const valid = validateApplicationSubmission();
    if (!valid) {
      return;
    } else {
      const data = await sendNewUserApplication(application);
      if (!data) {
        return;
      } else {
        resetInputsOnApplicationCreation();
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
            <RequiredField text="You must a company name" />
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
            name="salary"
            placeholder="Ex: 75000"
            onChange={handleChange}
          ></input>
        </li>
        <li>
          <p>Posting Url: </p>
          <input
            value={application.companyUrl ?? ""}
            name="companyUrl"
            placeholder="Ex: https://www.example.com"
            onChange={handleChange}
          ></input>
        </li>
      </ul>
      <hr className="solid"></hr>
      <button className="add-application-btn" onClick={createApplication}>
        Create Application
      </button>
    </div>
  );
}

export default AddApplication;
