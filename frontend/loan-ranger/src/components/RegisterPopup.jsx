import "../stylesheets/RegisterPopup.css";


function RegisterPopup({ togglePopup }) {
    return (
      <div className="popup-overlay">
        <div className="popup">

            <input type="email" name="email" placeholder="Enter Email" required />
            <input type="password" name="password" placeholder="Enter Password" required />
            <select>
                <option></option>
                <option value="African">African</option>
                <option value="African American">African American</option>
                <option value="East Asian">East Asian: Chinese, Japanese, Korean, etc.</option>
                <option value="Middle Eastern">Middle Eastern</option>
            </select>
            <input type="text" name="salary" placeholder="Enter Salary" required />
            <input type="text" name="ownedHomes" placeholder="Enter Number of Homes Owned" required />
            <input type="text" name="creditHistory" placeholder="Enter Credit History" required />
            <button type="submit">Register</button>
            <button className="submit" onClick={togglePopup}>Cancel</button>

        </div>
      </div>
    );
  }
  
  export default RegisterPopup;
  