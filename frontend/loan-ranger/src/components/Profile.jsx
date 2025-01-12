import React, { useEffect, useState } from "react";
import "../stylesheets/Profile.css";

function Profile() {
  const [userData, setUserData] = useState(null);
  const userId = "678394888c867f2a6bae24f2"; // Replace with actual user ID

  useEffect(() => {
    // Fetch user data from the backend
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
      });
  }, [userId]);

  if (!userData) {
    return <p>Loading...</p>; // Show loading state while data is being fetched
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">Welcome Back, {userData.name || "User"}</h2>

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
          <strong>Cash on Hand:</strong> {userData.assets.financial_assets.cash_and_equivalents.cash_on_hand}
        </p>
        <p>
          <strong>Stocks:</strong> {userData.assets.financial_assets.investments.stocks}
        </p>
        <p>
          <strong>Residential Properties:</strong> {userData.assets.real_assets.real_estate.residential_properties}
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

      <div className="profile-actions">
        <button className="profile-button">Edit Profile</button>
        <button className="profile-button">Request Assistance</button>
      </div>
    </div>
  );
}

export default Profile;
