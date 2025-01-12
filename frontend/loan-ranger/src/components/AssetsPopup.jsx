import { useState } from "react";
import "../stylesheets/AssetsPopup.css";

function AssetsPopup({ togglePopup }) {
  // Define asset categories and subcategories
  const assetCategories = {
    financial_assets: {
      cash_and_equivalents: ["Cash on Hand", "Savings Account", "Checking Account", "Certificates of Deposit"],
      investments: ["Stocks", "Bonds", "Mutual Funds", "ETFs", "Cryptocurrency", "Retirement Accounts"],
    },
    real_assets: {
      real_estate: ["Residential Properties", "Commercial Properties", "Land", "Vacation Properties"],
      vehicles: ["Cars", "Motorcycles", "Boats", "Recreational Vehicles", "Aircraft"],
    },
    personal_assets: {
      personal_items: ["Jewelry", "Precious Metals", "Art Collections", "Antiques", "Collectibles"],
    },
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [formData, setFormData] = useState({});
  const [inputValue, setInputValue] = useState("");

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory("");
  };

  // Handle subcategory change
  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Save the entered value for the selected subcategory
  const handleSave = () => {
    if (selectedCategory && selectedSubcategory) {
      setFormData((prev) => ({
        ...prev,
        [`${selectedCategory}_${selectedSubcategory}`]: parseInt(inputValue, 10) || 0,
      }));
      alert(`Saved ${selectedSubcategory} as ${inputValue}`);
      setInputValue(""); // Reset input
    } else {
      alert("Please select a category and subcategory first.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Update Assets</h3>

        {/* Category Dropdown */}
        <div className="dropdown-group">
          <label>Asset Category:</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select a Category</option>
            {Object.keys(assetCategories).map((category) => (
              <option key={category} value={category}>
                {category.replace("_", " ").toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Dropdown */}
        {selectedCategory && (
          <div className="dropdown-group">
            <label>Asset Subcategory:</label>
            <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
              <option value="">Select a Subcategory</option>
              {Object.keys(assetCategories[selectedCategory]).flatMap((subcategory) =>
                assetCategories[selectedCategory][subcategory].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))
              )}
            </select>
          </div>
        )}

        {/* Input Field for Value */}
        {selectedSubcategory && (
          <div className="input-group">
            <label>Enter Value for {selectedSubcategory}:</label>
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={`Enter amount for ${selectedSubcategory}`}
            />
          </div>
        )}

        {/* Buttons */}
        <button className="save-button" onClick={handleSave}>
          Save Asset
        </button>
        <button className="close-button" onClick={togglePopup}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AssetsPopup;

