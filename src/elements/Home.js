import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './home.css';

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios.get('/projects')
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [deleted]);

  function handleDelete(projects_name) {
    axios.delete(`/delete/${projects_name}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="Home">
      <h3>All Projects</h3>
      
      <div className="button-container">
        <Link to='/create' className='btn btn-success'>Add Project</Link>
        <Link to='/logout' className="btn btn-danger">Logout</Link>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Intro</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((project) => {
              return (
                <tr key={project.projects_name}>
                  <td>{project.projects_name}</td>
                  <td>{project.intro}</td>
                  <td>{project.owner}</td>
                  <td>{project.status}</td>
                  <td>{project.start_time}</td>
                  <td>{project.end_time}</td>
                  <td className="action-buttons">
                    <button><Link to={`/edit/${project.projects_name}`} className='btn btn-primary'>Edit</Link></button>
                    <button><Link to={`/show/${project.projects_name}`} className='btn btn-primary'>Show Details</Link></button>
                    <button onClick={() => handleDelete(project.projects_name)} className="delet_btn">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;