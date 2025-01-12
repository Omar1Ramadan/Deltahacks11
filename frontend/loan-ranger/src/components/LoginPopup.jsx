import "../stylesheets/RegisterPopup.css";

function LoginPopup({ togglePopup }) {
    return (
      <div className="popup-overlay">
        <div className="popup">
          <h2>Login</h2>
          <input type="email" name="email" placeholder="Enter Email" required />
          <input type="password" name="password" placeholder="Enter Password" required />
          <button type="submit">Log In</button>
          <button className="close-popup" onClick={togglePopup}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
  
  export default LoginPopup;