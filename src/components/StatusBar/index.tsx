import React, { useContext } from "react";
import "./index.css";
import { MdChevronLeft } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { useLocation, useHistory } from "react-router-dom";
import { UserDataContext } from "../../context/UserPassContext";

function StatusBar() {
  const location = useLocation();
  const history = useHistory();
  const { loggedIn, setLoggedIn } = useContext(UserDataContext);

  return (
    <div className="StatusBar">
      <div>
        <span>Password Manager</span>
      </div>
      <div>
        {(location.pathname.startsWith("/add") ||
          location.pathname.startsWith("/edit/") ||
          location.pathname !== "/") && (
          <button
            aria-label="Go back"
            onClick={() => {
              history.goBack();
            }}
          >
            <MdChevronLeft size={40} />
          </button>
        )}
        {loggedIn && (
          <button
            className="logout"
            aria-label="Log out"
            onClick={() => {
              setLoggedIn(false);
              localStorage.removeItem("loggedInTimestamp");
            }}
          >
            <FaSignOutAlt size={32} />
          </button>
        )}
      </div>
    </div>
  );
}

export default StatusBar;
