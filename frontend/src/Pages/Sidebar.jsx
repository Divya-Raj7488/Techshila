// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/add-supplier">Add Supplier</Link>
        </li>
        <li>
          <Link to="/add-store-manager">Add Store Manager</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
