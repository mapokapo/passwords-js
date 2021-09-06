import React, { useContext, useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { UserDataContext } from "../../context/UserPassContext";

type Params = {
  appId: string;
};

function AppInfo() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [authCodeVisible, setAuthCodeVisible] = useState(false);
  const { apps } = useContext(UserDataContext);
  const { appId } = useParams<Params>();

  const app = apps.filter((a) => a.id.toString() === appId)[0] || null;
  const [visibleRecoveryCodes, setVisibleRecoveryCodes] = useState(
    app ? new Array(app?.recoveryCodes?.length).fill(false) : []
  );

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
            <span className={passwordVisible ? "visible" : ""}>
              {app.password}
            </span>
            <button onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? (
                <MdVisibility size={32} />
              ) : (
                <MdVisibilityOff size={32} />
              )}
            </button>
          </div>
          <hr />
          <span>Authenticator Code</span>
          {app.authCode ? (
            <div>
              <span className={authCodeVisible ? "visible" : ""}>
                {app.authCode}
              </span>
              <button onClick={() => setAuthCodeVisible(!passwordVisible)}>
                {authCodeVisible ? (
                  <MdVisibility size={32} />
                ) : (
                  <MdVisibilityOff size={32} />
                )}
              </button>
            </div>
          ) : (
            <h2>Unavailable</h2>
          )}
          <hr />
          <span>Recovery Codes</span>
          <div className="chips">
            {app.recoveryCodes?.map((code, i) => (
              <div key={i} className={visibleRecoveryCodes[i] ? "visible" : ""}>
                <span key={i}>{code}</span>
                <button
                  onClick={() =>
                    setVisibleRecoveryCodes(
                      Object.assign([...visibleRecoveryCodes], { [i]: true })
                    )
                  }
                >
                  <MdVisibilityOff size={32} />
                </button>
              </div>
            ))}
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default AppInfo;
