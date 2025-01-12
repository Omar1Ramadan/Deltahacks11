import "../stylesheets/RegisterPopup.css";
import { useState } from 'react'

function RegisterPopup({ togglePopup }) {
  const [formData, setFormData] = useState({
    name:"john doe",
    race:"",
    disability:"",
    assets: {
        financial_assets: {
            cash_and_equivalents: {
                cash_on_hand: 0,
                savings_account: 0,
                checking_account: 0,
                certificates_of_deposit: 0
            },
            investments: {
                stocks: 0,
                bonds: 0,
                mutual_funds: 0,
                etfs: 0,
                cryptocurrency: 0,
                retirement_accounts: 0
            }
        },
        real_assets: {
            real_estate: {
                residential_properties: 0,
                commercial_properties: 0,
                land: 0,
                vacation_properties: 0
            },
            vehicles: {
                cars: 0,
                motorcycles: 0,
                boats: 0,
                recreational_vehicles: 0,
                aircraft: 0
            }
        },
        personal_assets: {
            jewelry: 0,
            precious_metals: 0,
            art_collections: 0,
            antiques: 0,
            collectibles: 0
        }
    },
    salary: 0,
    baseline_credit_score:0,
    number_of_months_of_loan:"",
    credit_history:[
            {
            date: "2023-11-15",
            transaction_type: "New Loan",
            amount: 10000,
            on_time_payements:"On Time",
            outstanding_balance: 10000,
            payment_status: "Active",
            creditor_name: "XYZ Bank",
            credit_account_type: "Personal Loan",
            interest_rate: 8.5,
            remarks: "Initial disbursement"
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
          type="text"
          name="ownedHomes"
          placeholder="Enter Number of Homes Owned"
          value={formData.ownedHomes}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="creditHistory"
          placeholder="Enter Credit History"
          value={formData.creditHistory}
          onChange={handleChange}
          required
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
  