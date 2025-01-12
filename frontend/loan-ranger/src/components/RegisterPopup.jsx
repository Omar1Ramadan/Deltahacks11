import "../stylesheets/RegisterPopup.css";
import { useState } from 'react'

function RegisterPopup({ togglePopup }) {
  const [formData, setFormData] = useState({
    name:"",
    race:"",
    disability:"",
    salary: "",
    baseline_credit_score:"",
    number_of_months_of_loan:"",
    assets: {
      cars: "",
      houses: "",
    },
    credit_history:[
            {
            date: "",
            transaction_type: "",
            // amount: "",
            // on_time_payements:"",
            // outstanding_balance: "",
            // payment_status: "",
            // creditor_name: "",
            // credit_account_type: "",
            // interest_rate: "",
            // remarks: ""
            }
    ],
    email:"oramadan2004@gmail.com",
    password:"somepassword"
  })

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("users/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("User registered successfully!");
        togglePopup(); // Close the popup after successful registration
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        alert("Failed to register user.");
      }
    } catch (error) {
      console.error("Error posting data:", error);
      alert("An error occurred while registering.");
    }
  }
    return (
      <div className="popup-overlay">
        <div className="popup">

        <input
          type="string"
          name="Full Name"
          placeholder="Enter Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="race"
          value={formData.race}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Race
          </option>
          <option value="African">African</option>
          <option value="African American">African American</option>
          <option value="East Asian">East Asian: Chinese, Japanese, Korean, etc.</option>
          <option value="Middle Eastern">Middle Eastern</option>
        </select>
        <input
          type="text"
          name="salary"
          placeholder="Enter Salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
        
        <input
          type="string"
          name="creditHistory"
          placeholder="Enter Credit History"
          value={formData.creditHistory}
          onChange={handleChange}
          required
        />


<input
          type="number"
          name="salary"
          placeholder="Enter Salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />

        {/*
          Here we show how to handle "ASSETS ARE CARS AND HOUSES."
          We do 'cars' and 'houses' as separate <input> fields.
        */}
        <input
          type="number"
          name="cars"
          placeholder="Enter number of cars"
          value={formData.assets.cars}
          onChange={handleChange}
        />

        <input
          type="number"
          name="houses"
          placeholder="Enter number of houses"
          value={formData.assets.houses}
          onChange={handleChange}
        />

        <input
          type="number"
          name="baseline_credit_score"
          placeholder="Enter Baseline Credit Score"
          value={formData.baseline_credit_score}
          onChange={handleChange}
        />

        <input
          type="text"
          name="number_of_months_of_loan"
          placeholder="Enter Number of Months of Loan"
          value={formData.number_of_months_of_loan}
          onChange={handleChange}
        />

        {/*
          Because credit_history is an array of objects, we’ll just demonstrate
          controlling the first item. In a real app, you might dynamically map them, etc.
        */}
        <input
          type="text"
          placeholder="Credit History Date"
          value={formData.credit_history[0].date}
          onChange={(e) => {
            const updated = [...formData.credit_history];
            updated[0].date = e.target.value;
            setFormData({ ...formData, credit_history: updated });
          }}
        />

        <input
          type="text"
          placeholder="Transaction Type"
          value={formData.credit_history[0].transaction_type}
          onChange={(e) => {
            const updated = [...formData.credit_history];
            updated[0].transaction_type = e.target.value;
            setFormData({ ...formData, credit_history: updated });
          }}
        />

        <button type="button" onClick={handleRegister}>
          Register
        </button>
        <button type="button" className="submit" onClick={togglePopup}>
          Cancel
        </button>

        </div>
      </div>
    );
  }
  
  export default RegisterPopup;
  