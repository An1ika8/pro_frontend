import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import './Show.css';  

function Show() {
    const [data, setData] = useState([]);
    const { projects_name } = useParams();

    useEffect(() => {
        axios.get(`/get_projects/${projects_name}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, [projects_name]);

    return (
        <div className="container">
            <h3>Project Details</h3>
            <Link to="/home">Back</Link>
            {data.map((project) => {
                return (
                    <ul key={project.projects_name}>
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
