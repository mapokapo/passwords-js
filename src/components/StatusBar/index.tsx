import React from "react";
import "./index.css";
import { MdChevronLeft } from "react-icons/md";
import { useLocation, useHistory } from "react-router-dom";

function StatusBar() {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className="StatusBar">
      <div>
        <span>Password Manager</span>
      </div>
      <div>
        {location.pathname !== "/" && (
          <MdChevronLeft
            size={40}
            onClick={() => {
              history.goBack();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default StatusBar;
