import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

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
                            {project.projects_name}
                        </li>
                        <li>
                            <b>Description: </b>
                            {project.intro}
                        </li>
                        <li>
                            <b>Owner Name: </b>
                            {project.owner}
                        </li>
                        <li>
                            <b>Project Status: </b>
                            {project.status}
                        </li>
                        <li>
                            <b>Start Time: </b>
                            {project.start_time}
                        </li>
                        <li>
                            <b>End Time: </b>
                            {project.end_time}
                        </li>
                    </ul>
                );
            })}
        </div>
    );
}

export default Show;