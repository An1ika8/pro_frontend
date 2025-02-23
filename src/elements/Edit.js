import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="container">
      <h1>User {projects_name}</h1>
      <Link to="/" className="btn btn-success">
        Back
      </Link>
      {data.map((project) => {
        return (
          <form onSubmit={handleSubmit} key={project.projects_name}>
            <div className="form-group my-3">
              <label htmlFor="projects_name">Name</label>
              <input
                value={project.projects_name}
                type="text"
                name="projects_name"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="intro">Intro</label>
              <input
                value={project.intro}
                type="text"
                name="intro"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="owner">Owner</label>
              <input
                value={project.owner}
                type="text"
                name="owner"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="status">Status</label>
              <input
                value={project.status}
                type="text"
                name="status"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="start_time">Start time</label>
              <input
                value={project.start_time}
                type="date"
                name="start_time"
                onChange={handleChange}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="end_time">End time</label>
              <input
                value={project.end_time}
                type="date"
                name="end_time"
                onChange={handleChange}
              />
            </div>
            <div className="form-group my-3">
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        );
      })}
    </div>
  );
}

export default Edit;