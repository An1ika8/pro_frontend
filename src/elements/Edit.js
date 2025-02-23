import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './Edit.css';

function Edit() {
  const [data, setData] = useState([]);
  const { projects_name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/get_projects/${projects_name}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [projects_name]);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/edit_user/${projects_name}`, data[0])
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0] = { ...updatedData[0], [name]: value };
      console.log(updatedData);
      return updatedData;
    });
  };

  return (
    <div className="edit-container">
      <h1>Edit Project - {projects_name}</h1>
      <Link to="/home" className="btn btn-primary">
        Back
      </Link>
      {data.map((project) => {
        return (
          <form onSubmit={handleSubmit} key={project.projects_name} className="form-container">
            <div className="form-group">
              <label htmlFor="projects_name">Project Name</label>
              <input
                value={project.projects_name}
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
                value={project.intro}
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
                value={project.owner}
                type="text"
                name="owner"
                required
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <input
                value={project.status}
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
                value={project.start_time}
                type="date"
                name="start_time"
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="end_time">End Time</label>
              <input
                value={project.end_time}
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
        );
      })}
    </div>
  );
}

export default Edit;