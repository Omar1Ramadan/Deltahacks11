import "../stylesheets/Profile.css"
function Profile() {

    const userData = {
        name: "Jane Doe",
        race: "African American",
        disability: "None",
        assets: 20000,
        salary: 20000,
        baselineCreditScore: 20000,
      };

    return(
      <div className="profile-container">
        <h2 className="profile-title">Welcome Back</h2>
      <div className="profile-section">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Race:</strong> {userData.race}</p>
        <p><strong>Disability:</strong> {userData.disability}</p>
      </div>
      <div className="profile-section">
        <p><strong>Assets:</strong> {userData.assets} <button className="details-button">View Details</button></p>
        <p><strong>Salary:</strong> {userData.salary}</p>
        <p><strong>Baseline Credit Score:</strong> {userData.baselineCreditScore}</p>
      </div>
      <div className="profile-actions">
        <button className="profile-button">View Credit History</button>
        <button className="profile-button">Get Assistance</button>
      </div>
    </div>
    )
}

export default Profile;