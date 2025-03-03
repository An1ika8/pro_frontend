import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import './Edit.css';

function Edit() {
  const [data, setData] = useState({
    project_id: '',
    projects_name: '',
    intro: '',
    owner: '',
    status: '',
    start_time: '',
    end_time: ''
  });

  const { project_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (project_id) {
      axios
        .get(`http://192.168.78.157:5000/get_projects/${project_id}`)
        .then((res) => {
          setData(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
          alert('Error fetching project details');
        });
    }

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setData(prevData => ({ ...prevData, owner: decoded.username }));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [project_id]);

  function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in.");
      alert("You must be logged in to edit a project.");
      return;
    }

    console.log("Sending update request for:", project_id);
    console.log("Token being sent:", token); 

    axios
      .put(`http://192.168.78.157:5000/edit_user/${project_id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log("Project updated:", res.data);
        alert("Project updated successfully!");
        navigate("/home");
      })
      .catch((err) => {
        if (err.response) {
          console.error("Error updating project:", err.response.data);
          alert(err.response.data.error);
        } else {
          console.error("Unknown error:", err);
        }
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="edit-container">
      <h1>Edit Project - {project_id}</h1>
      <Link to="/home" className="btn btn-primary">
        Back
      </Link>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="project_id">Project Id</label>
          <input
            value={data.project_id}
            type="text"
            name="project_id"
            required
            onChange={handleChange}
            className="form-input"
            readOnly 
          />
        </div>
        <div className="form-group">
          <label htmlFor="projects_name">Project Name</label>
          <input
            value={data.projects_name}
            type="text"
            name="projects_name"
            required
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="intro">Intro</label>
          <input
            value={data.intro}
            type="text"
            name="intro"
            required
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="owner">Owner</label>
          <input
            value={data.owner}
            type="text"
            name="owner"
            readOnly 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            value={data.status}
            type="text"
            name="status"
            required
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="start_time">Start Time</label>
          <input
            value={data.start_time}
            type="date"
            name="start_time"
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="end_time">End Time</label>
          <input
            value={data.end_time}
            type="date"
            name="end_time"
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;