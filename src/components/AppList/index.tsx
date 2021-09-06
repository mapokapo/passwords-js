import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../../context/UserPassContext";
import AppTile from "../AppTile";
import "./index.css";

function AppList() {
  const { apps, setApps } = useContext(UserDataContext);

  return (
    <div className="AppList">
      {apps.length === 0 ? (
        <>
          <span>No apps found.</span>
        </>
      ) : (
        apps.map((app, i) => (
          <AppTile
            key={i}
            setSelected={() => {
              setApps(
                apps.map((a) =>
                  a.id === app.id
                    ? { ...a, selected: true }
                    : { ...a, selected: false }
                )
              );
            }}
            app={app}
          />
        ))
      )}
      <Link to="add">
        <span>Add an app</span>
      </Link>
    </div>
  );
}

export default AppList;
