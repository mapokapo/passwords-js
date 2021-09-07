import React, { useContext, useState } from "react";
import "./index.css";
import { useHistory, useParams } from "react-router-dom";
import {
  MdClose,
  MdContentCopy,
  MdDelete,
  MdEdit,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { UserDataContext } from "../../context/UserPassContext";

const { clipboard } = window.require("electron");

type Params = {
  appId: string;
};

function AppInfo() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [authCodeVisible, setAuthCodeVisible] = useState(false);
  const { apps, setApps } = useContext(UserDataContext);
  const { appId } = useParams<Params>();
  const history = useHistory();

  const app = apps.filter((a) => a.id.toString() === appId)[0] || null;
  const [visibleRecoveryCodes, setVisibleRecoveryCodes] = useState(
    app ? new Array(app?.recoveryCodes?.length).fill(false) : []
  );

  function deleteApp() {
    const newApps = [...apps].filter((a) => a.id !== app?.id);
    setApps(newApps);
    localStorage.setItem("apps", JSON.stringify(newApps));
    history.goBack();
  }

  return (
    <div className="AppInfo">
      {app === null ? (
        appId === undefined ? (
          <h2>Select an app to start</h2>
        ) : (
          <h1>App not found.</h1>
        )
      ) : (
        <>
          <div>
            <app.icon size={24} />
            <h1>{app.name}</h1>
          </div>
          <hr />
          <span>Password</span>
          <div>
            <input
              className={passwordVisible ? "visible" : ""}
              disabled={!passwordVisible}
              value={passwordVisible ? app.password : ""}
            />
            <button
              aria-label="Show password"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <MdVisibility size={32} />
              ) : (
                <MdVisibilityOff size={32} />
              )}
            </button>
            <button
              aria-label="Copy password"
              onClick={() => {
                clipboard.writeText(app.password);
              }}
            >
              <MdContentCopy size={24} />
            </button>
          </div>
          <hr />
          <span>Authenticator Code</span>
          {app.authCode ? (
            <div>
              <input
                className={authCodeVisible ? "visible" : ""}
                disabled={!authCodeVisible}
                value={authCodeVisible ? app.authCode : ""}
              />

              <button
                aria-label="Show password"
                onClick={() => setAuthCodeVisible(!authCodeVisible)}
              >
                {authCodeVisible ? (
                  <MdVisibility size={32} />
                ) : (
                  <MdVisibilityOff size={32} />
                )}
              </button>
              <button
                aria-label="Copy password"
                onClick={() => {
                  clipboard.writeText(app.authCode);
                }}
              >
                <MdContentCopy size={24} />
              </button>
            </div>
          ) : (
            <h2>Unavailable</h2>
          )}
          <hr />
          <span>Recovery Codes</span>
          <div className="chips">
            {app.recoveryCodes.length > 0 ? (
              app.recoveryCodes.map((code, i) => (
                <div
                  key={i}
                  className={visibleRecoveryCodes[i] ? "visible" : ""}
                >
                  <input
                    key={i}
                    value={visibleRecoveryCodes[i] ? code : ""}
                    disabled={!visibleRecoveryCodes[i]}
                  />
                  <button
                    aria-label="Show recovery code"
                    onClick={() =>
                      setVisibleRecoveryCodes(
                        Object.assign([...visibleRecoveryCodes], { [i]: true })
                      )
                    }
                  >
                    <MdVisibilityOff size={32} />
                  </button>
                </div>
              ))
            ) : (
              <h2>Unavailable</h2>
            )}
          </div>
          <hr />
          <div className="actionButtons">
            <button
              aria-label="Close app view"
              onClick={() => {
                history.replace("/");
              }}
            >
              <MdClose size={48} />
            </button>
            <button
              aria-label="Edit app"
              onClick={() => {
                history.push("edit/" + app.id);
              }}
            >
              <MdEdit size={48} />
            </button>
            <button
              aria-label="Delete app"
              onClick={() => {
                deleteApp();
              }}
            >
              <MdDelete size={48} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AppInfo;
