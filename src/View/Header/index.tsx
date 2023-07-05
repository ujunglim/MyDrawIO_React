import React from "react";
import "./style.css";

const Header = () => {
  return (
    <header>
      <img
        src="https://app.diagrams.net/favicon.ico"
        alt="logo"
        className="logo"
      />
      <div>
        <h3>DRAW IO</h3>
        <ul>
          <li>File</li>
          <li>Edit</li>
          <li>Show</li>
          <li>Others</li>
          <li>Help</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
