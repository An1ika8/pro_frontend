import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './AddMember.css';

const AddMember = () => {
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedProject, setSelectedProject] = useState("");
    const [role, setRole] = useState("member");
    const [addedMembers, setAddedMembers] = useState([]);

    const { project_id } = useParams();
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem("token");

        
        axios.get("http://192.168.78.157:5000/get_users", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            setUsers(res.data);
        })
        .catch((err) => console.error("Error fetching users:", err));

        
        axios.get("http://192.168.78.157:5000/projects", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            setProjects(res.data);
        })
        .catch((err) => console.error("Error fetching projects:", err));

        
        if (project_id) {
            fetchAddedMembers(project_id, token);
        }
    }, [project_id]);

    useEffect(() => {
        if (selectedProject) {
            const token = localStorage.getItem("token");
            fetchAddedMembers(selectedProject, token);
        }
    }, [selectedProject]);

    const fetchAddedMembers = (project_id, token) => {
        axios.get(`http://192.168.78.157:5000/project_members/${project_id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            setAddedMembers(res.data);
        })
        .catch((err) => console.error("Error fetching project members:", err));
    };

    const handleAddMember = () => {
        const token = localStorage.getItem("token");

        if (!selectedUser || !selectedProject) {
            alert("Please select a user and a project.");
            return;
        }

        axios.post("http://192.168.78.157:5000/add_project_member", {
            project_id: selectedProject,
            user_id: selectedUser,
            role: role
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            alert("User added successfully!");
            
            fetchAddedMembers(selectedProject, token);
        })
        .catch((err) => {
            console.error("Error adding member:", err.response ? err.response.data : err);
        });
    };

    return (
        <div className="add-member-container">
            <h2>Add Project Member</h2>
            <label>Select Project:</label>
            <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
                <option value="">Select Project</option>
                {projects.map(project => (
                    <option key={project.project_id} value={project.project_id}>{project.projects_name}</option>
                ))}
            </select>

            <label>Select User:</label>
            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                <option value="">Select User</option>
                {users.map(user => (
                    <option key={user.user_id} value={user.user_id}>{user.username}</option>
                ))}
            </select>

            <label>Select Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="member">Member</option>
                {/* <option value="admin">Admin</option> */}
            </select>

            <button onClick={handleAddMember}>Add Member</button>

            <h3>Members Added by You</h3>
            <ul>
                {addedMembers.map(member => (
                    <li key={member.user_id}>{member.username} ({member.role})</li>
                ))}
            </ul>

            <button onClick={() => navigate('/home')} className="btn btn-secondary">Back to Home</button>
        </div>
    );
};

export default AddMember;