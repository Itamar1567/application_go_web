import "./application_module.css";
import downArrow from "../assets/down-arrow.png";
import closeImg from "../assets/close_details.png";
import { useState } from "react";
import type { ToGetApplication, ToUpdateApplication } from "../interfaces/ToDoApplication";
import StatusButton from "./status_button";
import { useApplicationService } from "../hooks/useApplicationService";

interface props {
  onDelete: (id: number) => void;
  details: ToGetApplication;
}

function ApplicationModule({details, onDelete}: props) {

  const { updateUserApplication, deleteUserApplication } = useApplicationService();

  const statusType = [
    { text: "Applied", color: "#47f559" },
    { text: "Interviewed", color: "#ecff3d" },
    { text: "Accepted", color: "#e710c3ff" },
    { text: "Rejected", color: "#e01313ff" },
  ];

  const type: string[] = ["Full-Time", "Part-Time", "Internship", "Contract"];
  const location: string[] = ["OnSite", "Hybrid", "Remote"];

  const [updatedApplicationDetails, setUpdatedApplicationDetails] = useState<ToUpdateApplication>(details);

  //Status section

  const [currStatIndex, setCurrStatIndex] = useState(details.status);

  const [isPressDelete, setIsPressDelete] = useState(false);

  function changeStatusIndex() {
    let newStatus = (currStatIndex + 1) % statusType.length;
    setCurrStatIndex(newStatus);
    setUpdatedApplicationDetails((prev) => ({...prev, ["status"]: newStatus}))
    
  }

  //End section

  const [isExtraDetails, setIsExtraDetails] = useState(false);

  let extraDetailsImg = isExtraDetails ? closeImg : downArrow;

  const deleteApplication = async() => {
    if (!isPressDelete) {
      setIsPressDelete(true);
      return;
    } else {
      try{
        const res = await deleteUserApplication(details.id);
      alert(res.message)
      onDelete(details.id);
      }catch(err: any){
        alert(err.message);
      }
      
    }
  };

  const handleChangeApplication = async() =>{
    try{
      const res = await updateUserApplication(details.id, updatedApplicationDetails);
      alert(res.message);
    }catch(err: any){
      alert(err.message)
    }
  }

  return (
    <div className="main">
      <ul className="top-ul">
        <li>
          <h3>Company: {details.companyName}</h3>
        </li>
        <li>
          <h3>Applied: {details.dateApplied}</h3>
        </li>
      </ul>
      <ul className="details-ul text-styling">
        <li>
          {details.lastUpdated && <p>Last Updated: {details.lastUpdated} </p>}
        </li>
        <li>{type[details.type] && <p>Type: {type[details.type]} </p>}</li>
        <li>
          {location[details.location] && (
            <p>Location: {location[details.location]} </p>
          )}
        </li>
        <li>{details.role && <p>Role: {details.role} </p>}</li>
      </ul>

      <div className="details-btn-container">
        <button
          id="extras-img"
          onClick={() => setIsExtraDetails(!isExtraDetails)}
        >
          <img src={extraDetailsImg}></img>
        </button>
      </div>
      <div
        className={`extra-details-container ${isExtraDetails ? "open" : ""}`}
      >
        <ul className="extra-details-ul">
          {details.country && (
            <li>
              <p>Country: {details.country}</p>
            </li>
          )}
          {details.state && (
            <li>
              <p>State: {details.state}</p>
            </li>
          )}
          {details.salary && (
            <li>
              <p>Salary: {details.salary}$</p>
            </li>
          )}
        </ul>
      </div>
      <StatusButton
        color={statusType[currStatIndex].color}
        text={statusType[currStatIndex].text}
        click={changeStatusIndex}
      ></StatusButton>
      <div className="edit-buttons-container">
        <button onClick={handleChangeApplication}>Save Changes</button>
        <button
          onClick={() => deleteApplication()}
          style={
            isPressDelete ? { backgroundColor: "red" } : { backgroundColor: "" }
          }
        >
          {" "}
          {isPressDelete ? "Are you sure!" : "Delete Application"}
        </button>
      </div>
    </div>
  );
}

export default ApplicationModule;
