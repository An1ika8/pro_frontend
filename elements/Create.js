import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import './Create.css';

function Create() {
    const [values, setValues] = useState({
        project_id: '',
        project_name: '',
        intro: '',
        owner: '',
        status: 'In Progress', 
        start_time: '',
        end_time: '',
    });

    const navigate = useNavigate();

    
    useEffect(() => {
        const token = localStorage.getItem("token");
    if (token) {
        axios.get("http://192.168.78.157:5000/user_profile", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            setValues(prev => ({ ...prev, owner: res.data.username }));
        })
        .catch((err) => console.log("Error fetching user profile:", err));
    }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        console.log('Submitting form with values:', values);

        axios.post('http://192.168.78.157:5000/add_project', values, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then((res) => {
                console.log('Project added successfully:', res);
                navigate('/home'); 
            })
            .catch((err) => {
                console.error('Error adding project:', err);
            });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    return (
        <div className="create-container">
            <div className="create-form">
                <h3>Add Project</h3>
                <div>
                    <Link to={'/home'} className="btn btn-success">Back to Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                        <label htmlFor="project_id">Project Id:</label>
                        <input 
                            type="text" 
                            name="project_id" 
                            placeholder="Enter project id" 
                            value={values.project_id}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="project_name">Project Name:</label>
                        <input 
                            type="text" 
                            name="project_name" 
                            placeholder="Enter project name" 
                            value={values.project_name}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="intro">Introduction:</label>
                        <input 
                            type="text" 
                            name="intro" 
                            placeholder="Enter project description" 
                            value={values.intro}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="owner">Owner:</label>
                        <input 
                            type="text" 
                            name="owner" 
                            value={values.owner}
                            readOnly 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <select
                            name="status"
                            value={values.status}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Incomplete">Incomplete</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="start_time">Start Time:</label>
                        <input 
                            type="date" 
                            name="start_time" 
                            value={values.start_time}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="end_time">End Time:</label>
                        <input 
                            type="date" 
                            name="end_time" 
                            value={values.end_time}
                            onChange={handleChange} 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Project</button>
                </form>
            </div>
        </div>
    );
}

export default Create;
