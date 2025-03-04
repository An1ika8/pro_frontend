import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./UserProfile.css";

function UserProfile() {
    const [userProfile, setUserProfile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in.");
            navigate("/login");
            return;
        }

        axios
            .get("http://192.168.78.157:5000/user_profile", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setUserProfile(res.data);
                setUsername(res.data.username);
                setEmail(res.data.email);
            })
            .catch((err) => {
                console.error("Error fetching user profile:", err);
                alert("Failed to fetch user profile.");
            });
    }, [navigate]);

    const handleUpdate = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in.");
            return;
        }

        const updatedData = { username, email };

        axios
            .put("http://192.168.78.157:5000/user_profile", updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setUserProfile(res.data);
                setIsEditing(false);
                alert("Profile updated successfully!");
            })
            .catch((err) => {
                console.error("Error updating user profile:", err);
                alert("Failed to update profile.");
            });
    };

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>User Profile</h2>
            </div>

            <div className="profile-info">
                <span>Username: {username}</span>
                <p>Email: {email}</p>

                <button className="btn btn-primary" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Cancel" : "Edit Profile"}
                </button>

                <Link to={'/home'} className="btn btn-success">Back to Home</Link>

                {isEditing && (
                    <form className="profile-form" onSubmit={handleUpdate}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
