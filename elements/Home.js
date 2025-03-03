import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
    const [data, setData] = useState([]);
    const [projectMembers, setProjectMembers] = useState({});
    const [deleted, setDeleted] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [userProfile, setUserProfile] = useState(null);

    // Fetching Projects and User Profile
    useEffect(() => {
        if (deleted) {
            setDeleted(false);
            fetchProjects();
            fetchUserProfile();
        }
    }, [deleted]);

    const fetchProjects = () => {
        axios
            .get("http://192.168.78.157:5000/projects")
            .then((res) => {
                setData(res.data);
                res.data.forEach(project => {
                    fetchProjectMembers(project.project_id);
                });
            })
            .catch((err) => console.log("Error fetching projects:", err));
    };

    const fetchUserProfile = () => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get("http://192.168.78.157:5000/user_profile", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setUserProfile(res.data);
                })
                .catch((err) => console.log("Error fetching user profile:", err));
        }
    };

    // Handle Deleting a project
    const handleDelete = (project_id) => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You must be logged in to delete a project.");
            return;
        }

        axios
            .delete(`http://192.168.78.157:5000/delete/${project_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                alert("Project deleted successfully!");
                setDeleted(true); // Refresh the project list after deletion
            })
            .catch((err) => {
                console.error("Error deleting project:", err.response?.data || err);
                alert(err.response?.data?.error || "Unknown error occurred");
            });
    };

    // Fetch project members for a specific project
    const fetchProjectMembers = (project_id) => {
        const token = localStorage.getItem("token");

        axios
            .get(`http://192.168.78.157:5000/project_members/${project_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setProjectMembers((prevState) => ({
                    ...prevState,
                    [project_id]: res.data,
                }));
            })
            .catch((err) => console.log("Error fetching project members:", err));
    };

    // Generate PDF report based on date range
    const generatePDF = () => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        const pdfUrl = `http://192.168.78.157:5000/generate_report?start_date=${startDate}&end_date=${endDate}`;
        window.open(pdfUrl, "_blank");
    };

    return (
        <div className="Home">
            <h3>All Projects</h3>
            <h3>{userProfile && (
                    <div className="profile-info">
                        <span>Welcome, {userProfile.username}</span>
                        <Link to="/profile" className="btn btn-primary">
                            Profile
                        </Link>
                        
                    </div>
                    
                )}</h3>



            <div className="button-container">
                <Link to="/create" className="btn btn-success">
                    Add Project
                </Link>
                <Link to="/members" className="btn btn-primary">
                    Add Members
                </Link>
                
                <Link to="/logout" className="btn btn-danger">
                    Logout
                </Link>
            </div>

            {/* PDF Report Section */}
            <div className="report-box">
                <h4>Generate PDF Report</h4>
                <div className="report-inputs">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="report-input"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="report-input"
                    />
                    <button onClick={generatePDF} className="btn btn-info">
                        Generate PDF
                    </button>
                </div>
            </div>

            {/* Projects Table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr className="table-header">
                            <th>Project Id</th>
                            <th>Project Name</th>
                            <th>Intro</th>
                            <th>Owner</th>
                            <th>Status</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Actions</th>
                            <th>Project Members</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((project) => (
                                <tr key={project.project_id}>
                                    <td>{project.project_id}</td>
                                    <td>{project.projects_name}</td>
                                    <td>{project.intro}</td>
                                    <td>{project.owner}</td>
                                    <td>{project.status}</td>
                                    <td>{project.start_time}</td>
                                    <td>{project.end_time}</td>
                                    <td className="action-buttons">
                                        <button>
                                            <Link to={`/edit/${project.project_id}`} className="btn btn-primary">
                                                Edit
                                            </Link>
                                        </button>
                                        <button>
                                            <Link to={`/show/${project.project_id}`} className="btn btn-primary">
                                                Details
                                            </Link>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.project_id)}
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <ul>
                                            {projectMembers[project.project_id] && projectMembers[project.project_id].length > 0 ? (
                                                projectMembers[project.project_id].map((member, index) => (
                                                    <li key={index}>
                                                        {member.username} ({member.role})
                                                    </li>
                                                ))
                                            ) : (
                                                <li>No members added</li>
                                            )}
                                        </ul>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9">No projects found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;