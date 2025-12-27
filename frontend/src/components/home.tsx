import ApplicationModule from "./application_module";
import "./home.css";
import type { ToGetApplication } from "../interfaces/ToDoApplication";
import { fetchUserApplications } from "../services/applicationService";
import { useEffect, useState } from "react";

function Home() {
  const [applicationsData, setApplicationsData] = useState<ToGetApplication[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await fetchUserApplications();
        setApplicationsData(data);
      } catch (err) {
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  const handleDeleteApplication = (id: number) => {

    setApplicationsData((prev) => prev.filter(application => application.id !== id));

  }

  return (
    <div>
      <title>Application Go</title>
      <div className="content">
        <div className="title-section">
          <h1>Your Applications</h1>
          <input placeholder="search by company name"></input>
        </div>

        <div className="applications-section">
            {applicationsData.map((application) => (
              <ApplicationModule key={application.id} {...application} onDelete={handleDeleteApplication} details={application}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
