import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Create.css';

function Create() {
    const [values, setValues] = useState({
        project_name: '',
        intro: '',
        owner: '',
        status: '',
        start_time: '',
        end_time: '',
    });

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        console.log('Submitting form with values:', values);

        axios.post('http://localhost:5000/add_project', values)
            .then((res) => {
                console.log('Project added successfully:', res);
                navigate('/'); // Navigate to the home page after success
            })
            .catch((err) => {
                console.error('Error adding project:', err);
                console.error('Error response:', err.response);
            });
    }

    return (
        <div className="create-container">
            <div className="create-form">
                <h3>Add Project</h3>
                <div>
                    <Link to={'/home'} className="btn btn-success">Back to Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="project_name">Project Name:</label>
                        <input 
                            type="text" 
                            name="project_name" 
                            placeholder="Enter your project's name" 
                            value={values.project_name}
                            onChange={(e) => setValues({ ...values, project_name: e.target.value })} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="intro">Introduction:</label>
                        <input 
                            type="text" 
                            name="intro" 
                            placeholder="Enter your project's description" 
                            value={values.intro}
                            onChange={(e) => setValues({ ...values, intro: e.target.value })} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="owner">Owner:</label>
                        <input 
                            type="text" 
                            name="owner" 
                            placeholder="Owner Name" 
                            value={values.owner}
                            onChange={(e) => setValues({ ...values, owner: e.target.value })} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <input 
                            type="text" 
                            name="status" 
                            placeholder="Project status" 
                            value={values.status}
                            onChange={(e) => setValues({ ...values, status: e.target.value })} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="start_time">Start Time:</label>
                        <input 
                            type="text" 
                            name="start_time" 
                            value={values.start_time}
                            onChange={(e) => setValues({ ...values, start_time: e.target.value })} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="end_time">End Time:</label>
                        <input 
                            type="text" 
                            name="end_time" 
                            value={values.end_time}
                            onChange={(e) => setValues({ ...values, end_time: e.target.value })} 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Project</button>
                </form>
            </div>
        </div>
    );
}

export default Create;
