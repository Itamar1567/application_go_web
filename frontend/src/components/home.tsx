import ApplicationModule from "./application_module";
import "./home.css";
import type { ToGetApplication } from "../interfaces/ToDoApplication";
import { useApplicationService } from "../hooks/useApplicationService";
import { useEffect, useState } from "react";

function Home() {

  const { fetchUserApplications } = useApplicationService();

  const [applicationsData, setApplicationsData] = useState<ToGetApplication[]>(
    []
  );

  //Search functionality

  const [searchItem, setSearchItem] = useState("");

  const [filteredData, setFilteredData] =
    useState<ToGetApplication[]>(applicationsData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchTerm: string = e.target.value;
    if (!searchTerm.trim()) {
      setSearchItem(searchTerm);
      setFilteredData(applicationsData);
      return;
    }
    setSearchItem(searchTerm);
    const filteredItems = applicationsData.filter((application) =>
      application.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  // End Search functionality

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await fetchUserApplications();
        setApplicationsData(data);
        setFilteredData(data);
      } catch (err: any) {
        alert(err.message);
      }
    };

    loadApplications();
  }, []);

  const handleDeleteApplication = (id: number) => {
    setApplicationsData((prev) =>
      prev.filter((application) => application.id !== id)
    );
    setFilteredData((prev) =>
      prev.filter((application) => application.id !== id)
    );
  };

  return (
    <div>
      <title>Application Go</title>
      <div className="content">
        <div className="title-section">
          <h1>Your Applications</h1>
          <input
            type="text"
            value={searchItem}
            onChange={handleInputChange}
            placeholder="search by company name"
          ></input>
        </div>

        <div className="applications-section">
          {Array.isArray(filteredData) && filteredData.map((application) => (
            <ApplicationModule
              key={application.id}
              {...application}
              onDelete={handleDeleteApplication}
              details={application}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
