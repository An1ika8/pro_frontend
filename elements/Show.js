import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import './Show.css';  

function Show() {
    const [data, setData] = useState([]);
    const { project_id } = useParams();

    useEffect(() => {
        axios.get(`/get_projects/${project_id}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, [project_id]);

    return (
        <div className="container">
            <h3>Project Details</h3>
            <Link to="/home">Back</Link>
            {data.map((project) => {
                return (
                    <ul key={project.project_id}>
                        <li>
                            <b>Project Id: </b>
                            <span>{project.project_id}</span>
                        </li>
                        <li>
                            <b>Project Name: </b>
                            <span>{project.projects_name}</span>
                        </li>
                        <li>
                            <b>Description: </b>
                            <span>{project.intro}</span>
                        </li>
                        <li>
                            <b>Owner Name: </b>
                            <span>{project.owner}</span>
                        </li>
                        <li>
                            <b>Project Status: </b>
                            <span>{project.status}</span>
                        </li>
                        <li>
                            <b>Start Time: </b>
                            <span>{project.start_time}</span>
                        </li>
                        <li>
                            <b>End Time: </b>
                            <span>{project.end_time}</span>
                        </li>
                    </ul>
                );
            })}
        </div>
    );
}

export default Show;
