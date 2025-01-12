import React, { useEffect, useState } from "react";
import "../stylesheets/Profile.css";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [resourcesData, setResourcesData] = useState(null);
  const [loadingResources, setLoadingResources] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User not logged in");
      return;
    }

    console.log("Fetching user data for userId:", userId);

    fetch(`/users/getUser/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched user data:", data);
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
      });
  }, []);

  useEffect(() => {
    if (!userData) return;

    const { race, location } = userData;
    if (!race || !location) return;

    setLoadingResources(true);

    const getCommunityResources = async () => {
      try {
        const response = await fetch("/ai/resource-endpoint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ race, location }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch community resources");
        }

        const aiResponse = await response.json();
        console.log("AI Response:", aiResponse);

        setResourcesData(aiResponse.resources || []);
      } catch (error) {
        console.error("Error fetching community resources:", error);
        setError("Failed to load community resources.");
      } finally {
        setLoadingResources(false);
      }
    };

    getCommunityResources();
  }, [userData]);

  if (error) return <p>{error}</p>;
  if (!userData) return <p>Loading user data...</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">Welcome Back, {userData.name || "User"}</h2>
      <div className="profile-section">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Race:</strong> {userData.race || "Not specified"}</p>
        <p><strong>Email:</strong> {userData.email}</p>
      </div>
      <div className="profile-section">
        <h3>Community Resources</h3>
        {loadingResources ? (
          <p>Loading resources...</p>
        ) : resourcesData ? (
          resourcesData.map((resource, index) => (
            <div key={index}>
              <h4>{resource.title}</h4>
              <p>{resource.description}</p>
            </div>
          ))
        ) : (
          <p>No resources available.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
