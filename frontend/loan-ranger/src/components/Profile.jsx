import React, { useEffect, useState } from "react";
import "../stylesheets/Profile.css";
import { CohereClientV2 } from 'cohere-ai';

const cohere = new CohereClientV2({
  token: '55z3APpnyuA6cokVBDcwYJcQ2VTtlTWJwFAqfvDc',
});

function Profile() {
  const [userData, setUserData] = useState(null);
  const [resourcesData, setResourcesData] = useState(null);
  const [loadingResources, setLoadingResources] = useState(false);
  const [error, setError] = useState(null);
  const [hasCalledAPI, setHasCalledAPI] = useState(false);

  const userId = "6783ad475225bcaef4052107";

  useEffect(() => {
    fetch(`/users/getUser/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
      });
  }, [userId]);

  useEffect(() => {
    if (!userData || hasCalledAPI) return;

    const { race, location } = userData;
    if (!race || !location) return;

    console.log("User Data being sent:", { race, location });

    setLoadingResources(true);
    setHasCalledAPI(true);

    const getCommunityResources = async () => {
      try {
        console.log("Making API call to Cohere...");
        
        // Create a race-specific system prompt
        let systemPrompt = `You are a Community Resource Advisor AI. Provide ONLY resources specifically relevant to the ${race} community in ${location.city}. 

Important guidelines:
1. Only list organizations that specifically serve the ${race} community
2. Provide up to 5 verified, currently active organizations
3. Include location and website information
4. Focus on local organizations in ${location.city} area

Format each resource as:
**[Organization Name]**
- Services: [Detailed description of services]
- Location: [Full address]
- Website: [website url]`;

        const response = await cohere.chat({
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: `What are the most relevant community resources available for ${race} individuals in ${location.city}, ${location.state}?`
            }
          ],
          model: "command-r7b-12-2024",
          temperature: 0.3,
        });

        const aiResponse = response.message.content[0].text;
        console.log("AI Response:", aiResponse);

        // Simplified resource formatting
        const resources = aiResponse.split('**')
          .filter(section => section.trim())
          .map(section => {
            const lines = section.split('\n').filter(line => line.trim());
            const title = lines[0].trim();
            let services = '';
            let location = '';
            let website = '';

            lines.forEach(line => {
              if (line.includes('Services:')) services = line.split('Services:')[1].trim();
              if (line.includes('Location:')) location = line.split('Location:')[1].trim();
              if (line.includes('Website:')) website = line.split('Website:')[1].trim();
            });

            return {
              title,
              description: services,
              location,
              link: website
            };
          })
          .filter(resource => resource.title && resource.description);

        setResourcesData({
          recommendedResources: resources
        });

      } catch (error) {
        console.error("Error getting community resources:", error);
        setError("Failed to load community resources.");
      } finally {
        setLoadingResources(false);
      }
    };

    getCommunityResources();
  }, [userData, hasCalledAPI]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!userData) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">Welcome Back, {userData?.name || "User"}</h2>

      {/* Basic Info */}
      <div className="profile-section">
        <p>
          <strong>Name:</strong> {userData.name}
        </p>
        <p>
          <strong>Race:</strong> {userData.race || "Not specified"}
        </p>
        <p>
          <strong>Disability:</strong> {userData.disability || "None"}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
      </div>

      {/* Assets Section */}
      <div className="profile-section">
        <h3>Assets</h3>
        <p>
          <strong>Cash on Hand:</strong>{" "}
          {userData.assets.financial_assets.cash_and_equivalents.cash_on_hand}
        </p>
        <p>
          <strong>Stocks:</strong> {userData.assets.financial_assets.investments.stocks}
        </p>
        <p>
          <strong>Residential Properties:</strong>{" "}
          {userData.assets.real_assets.real_estate.residential_properties}
        </p>
        <p>
          <strong>Jewelry:</strong> {userData.assets.personal_assets.jewelry}
        </p>
        <button className="details-button">View All Asset Details</button>
      </div>

      {/* Salary and Credit Info */}
      <div className="profile-section">
        <p>
          <strong>Salary:</strong> {userData.salary}
        </p>
        <p>
          <strong>Baseline Credit Score:</strong> {userData.baseline_credit_score}
        </p>
      </div>

      {/* Credit History */}
      <div className="profile-section">
        <h3>Credit History</h3>
        {userData.credit_history.map((record, index) => (
          <div key={index} className="credit-history-record">
            <p>
              <strong>Date:</strong> {record.date}
            </p>
            <p>
              <strong>Transaction Type:</strong> {record.transaction_type}
            </p>
            <p>
              <strong>Amount:</strong> {record.amount}
            </p>
            <p>
              <strong>Payment Status:</strong> {record.payment_status}
            </p>
            <p>
              <strong>Creditor:</strong> {record.creditor_name}
            </p>
          </div>
        ))}
      </div>

      {/* Location Information */}
      <div className="profile-section">
        <h3>Location</h3>
        <p>
          <strong>Country:</strong> {userData.location.country}
        </p>
        <p>
          <strong>State:</strong> {userData.location.state}
        </p>
        <p>
          <strong>City:</strong> {userData.location.city}
        </p>
        <p>
          <strong>Street:</strong> {userData.location.street_address}
        </p>
      </div>

      {/* AI Community Resources Section */}
      <div className="profile-section">
        <h3>Community Resources</h3>
        {loadingResources ? (
          <p>Checking for community resources...</p>
        ) : resourcesData ? (
          <div>
            {resourcesData.recommendedResources.map((resource, index) => (
              <div key={index} className="resource-item">
                <h4>{resource.title}</h4>
                <p>{resource.description}</p>
                {resource.location && <p><strong>Location:</strong> {resource.location}</p>}
                {resource.link && (
                  <a href={`https://${resource.link}`} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>No resources available.</p>
        )}
      </div>

      <div className="profile-actions">
        <button className="profile-button">Edit Profile</button>
        <button className="profile-button">Request Assistance</button>
      </div>
    </div>
  );
}

export default Profile;
