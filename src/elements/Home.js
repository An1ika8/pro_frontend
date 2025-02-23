import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      <h3>Projects</h3>
      <div>
        <Link to='/create' className='btn btn-success'>Add Project</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Intro</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Start Time</th>
            <th>End Time</th>
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
                <td>
                  <Link to={`/edit/${project.projects_name}`} className='btn btn-success'>Edit</Link>
                  <Link to={`/show/${project.projects_name}`} className='btn btn-success'>Show Project details</Link>
                  <button onClick={() => handleDelete(project.projects_name)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;