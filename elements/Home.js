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
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [showPDFOptions, setShowPDFOptions] = useState(false); // State for toggling PDF options

    // Fetching Projects and User Profile
    useEffect(() => {
        if (deleted) {
            setDeleted(false);
            fetchProjects();
            fetchUserProfile();
        }
    }, [deleted]);

    const fetchProjects = () => {
        setLoading(true);
        axios
            .get("http://192.168.78.157:5000/projects")
            .then((res) => {
                setData(res.data);
                res.data.forEach((project) => {
                    fetchProjectMembers(project.project_id);
                });
            })
            .catch((err) => console.log("Error fetching projects:", err))
            .finally(() => setLoading(false));
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
                    setNewUsername(res.data.username);
                    setNewEmail(res.data.email);
                })
                .catch((err) => console.log("Error fetching user profile:", err));
        }
    };

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
                setDeleted(true);
            })
            .catch((err) => {
                console.error("Error deleting project:", err.response?.data || err);
                alert(err.response?.data?.error || "Unknown error occurred");
            });
    };

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

    

    const generatePDF = () => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        setIsGeneratingPDF(true);
        const pdfUrl = `http://192.168.78.157:5000/generate_report?start_date=${startDate}&end_date=${endDate}`;
        window.open(pdfUrl, "_blank");
        setIsGeneratingPDF(false);
    };

    return (
        <div className="Home">
            <h3>All Projects</h3>
            {loading && <div className="spinner">Loading...</div>} {/* Show loading spinner */}

            <h3>{userProfile && (
                    <div className="profile-info">
                        <span>Welcome, {userProfile.username}</span>
                        <Link to="/profile" className="btn btn-primary">
                            Profile
                        </Link>
                    </div>
                )}
            </h3>

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

            
            <button
                className="btn btn-info"
                onClick={() => setShowPDFOptions(!showPDFOptions)} // Toggle visibility
            >
                {showPDFOptions ? 'Hide PDF Options' : 'Generate PDF Report to Display Current Project Details'}
            </button>

            {/* PDF Report Section */}
            {showPDFOptions && (
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
                        <button onClick={generatePDF} className="btn btn-info" disabled={isGeneratingPDF}>
                            {isGeneratingPDF ? 'Generating PDF...' : 'Generate PDF'}
                        </button>
                    </div>
                </div>
            )}

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
