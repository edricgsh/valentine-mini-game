import { useEffect, useState } from "react";
import "./Admin.css"; // Make sure the path matches where your CSS file is located

function Admin() {
  const [inputs, setInputs] = useState({
    attractiveOption: "",
    seeminglyBadOption: "",
    realDeal: "",
  });

  useEffect(() => {
    const savedInputs = {
      attractiveOption: localStorage.getItem("attractiveOption") || "",
      seeminglyBadOption: localStorage.getItem("seeminglyBadOption") || "",
      realDeal: localStorage.getItem("realDeal") || "",
    };
    setInputs(savedInputs);
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => {
      const updatedInputs = { ...prevInputs, [name]: value };
      localStorage.setItem(name, value);
      return updatedInputs;
    });
  };

  return (
    <div className="form-container">
      <form>
        <div className="form-row">
          <label className="form-label">Attractive Option:</label>
          <input
            type="text"
            name="attractiveOption"
            className="form-input"
            value={inputs.attractiveOption}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label className="form-label">Seemingly Bad Option:</label>
          <input
            type="text"
            name="seeminglyBadOption"
            className="form-input"
            value={inputs.seeminglyBadOption}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label className="form-label">Real Deal:</label>
          <input
            type="text"
            name="realDeal"
            className="form-input"
            value={inputs.realDeal}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}

export default Admin;
