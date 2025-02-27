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

    useEffect(() => {
        if (deleted) {
            setDeleted(false);

            axios.get("http://localhost:5000/projects")
                .then((res) => {
                    setData(res.data);
                    res.data.forEach(project => {
                        fetchProjectMembers(project.project_id);
                    });
                })
                .catch((err) => console.log("Error fetching projects:", err));
        }
    }, [deleted]);


    function handleDelete(project_id) {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found. Please log in.");
            alert("You must be logged in to delete a project.");
            return;
        }

        axios
            .delete(`http://localhost:5000/delete/${project_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                alert("Project deleted successfully!");
                setDeleted(true); 
            })
            .catch((err) => {
                if (err.response) {
                    console.error("Error deleting project:", err.response.data);
                    alert(err.response.data.error || "Unknown server error");
                } else {
                    console.error("Unknown error:", err);
                }
            });
    }

    const fetchProjectMembers = (project_id) => {
        const token = localStorage.getItem("token");

        axios.get(`http://localhost:5000/project_members/${project_id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            setProjectMembers(prevState => ({
                ...prevState,
                [project_id]: res.data
            }));
        })
        .catch((err) => console.log("Error fetching project members:", err));
    };

    
    const generatePDF = () => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        const pdfUrl = `http://localhost:5000/generate_report?start_date=${startDate}&end_date=${endDate}`;
        window.open(pdfUrl, "_blank");
    };

    return (
        <div className="Home">
            <h3>All Projects</h3>

            <div className="button-container">
                <Link to="/create" className="btn btn-success">Add Project</Link>
                <Link to="/members" className="btn btn-primary">Add Members</Link>
                <Link to="/logout" className="btn btn-danger">Logout</Link>
            </div>

            
            <div className="report-box">
                <h4>Generate PDF Report</h4>
                <div className="report-inputs">
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        className="report-input"
                        placeholder="Start Date"
                    />
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className="report-input"
                        placeholder="End Date"
                    />
                    <button onClick={generatePDF} className="btn btn-info">Generate PDF</button>
                </div>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
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
                        {data.map((project) => (
                            <tr key={project.project_id}>
                                <td>{project.project_id}</td>
                                <td>{project.projects_name}</td>
                                <td>{project.intro}</td>
                                <td>{project.owner}</td>
                                <td>{project.status}</td>
                                <td>{project.start_time}</td>
                                <td>{project.end_time}</td>
                                <td className="action-buttons">
                                    <button><Link to={`/edit/${project.project_id}`} className="btn btn-primary">Edit</Link></button>
                                    <button><Link to={`/show/${project.project_id}`} className="btn btn-primary">Show Details</Link></button>
                                    <button onClick={() => handleDelete(project.project_id)} className="delet_btn">Delete</button>
                                </td>
                                <td>
                                    <ul>
                                        {projectMembers[project.project_id] && projectMembers[project.project_id].length > 0 ? (
                                            projectMembers[project.project_id].map((member, index) => (
                                                <li key={index}>{member.username} ({member.role})</li>
                                            ))
                                        ) : (
                                            <li>No members added</li>
                                        )}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
