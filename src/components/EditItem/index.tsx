import React, { useContext, useState } from "react";
import "./index.css";
import randomColor from "randomcolor";

import * as faIcons from "react-icons/fa";
import { MdLock } from "react-icons/md";
import App from "../../classes/App";
import { UserDataContext } from "../../context/UserPassContext";
import { useHistory, useRouteMatch } from "react-router";

type Params = { appId: string };

function EditItem() {
  const route = useRouteMatch<Params>({
    path: "/edit/:appId?",
    exact: true,
  });
  const { apps, setApps } = useContext(UserDataContext);

  const app: App | null =
    apps.find((a) => a.id.toString() === route?.params.appId) || null;

  const [appName, setAppName] = useState(app?.name || "");
  const [password, setPassword] = useState(app?.password || "");
  const [authCode, setAuthCode] = useState(app?.authCode || "");
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>(
    app?.recoveryCodes || [""]
  );
  if (recoveryCodes[recoveryCodes?.length - 1]?.length !== 0)
    recoveryCodes.push("");
  const [errors, setErrors] = useState<(string | undefined)[] | null>(null);
  const history = useHistory();

  function editApp() {
    // index 0 is icon name, index 1 is icon component (function)
    let _errors = null;
    if (appName.length === 0) {
      if (!_errors) _errors = [];
      _errors.push("Invalid app name");
    }
    if (password.length === 0) {
      if (!_errors) _errors = [];
      if (_errors.length === 0) _errors.push(undefined);
      _errors.push("Invalid password");
    }
    setErrors(_errors);
    if (_errors) return;
    const icons = Object.entries(faIcons);
    let appIcon = MdLock;
    if (icons.map((arr) => arr[0]).includes(appName.trim())) {
      appIcon = icons.find((arr) => arr[0] === appName.trim())![1];
    }

    const newApp: App = {
      id: app?.id || Math.floor(Math.random() * 10000000000),
      name: appName.trim(),
      defaultColor: app?.defaultColor || randomColor(),
      icon: appIcon,
      authCode: authCode.trim().length !== 0 ? authCode.trim() : null,
      recoveryCodes: (recoveryCodes[recoveryCodes.length - 1]?.length === 0
        ? recoveryCodes.slice(0, -1)
        : recoveryCodes
      ).map((c) => c.trim()),
      password: password.trim(),
    };

    const newApps = [...apps];
    newApps[newApps.findIndex((a) => app?.id === a.id)] = newApp;
    setApps(newApps);

    localStorage.setItem(
      "apps",
      JSON.stringify(newApps.map((a) => ({ ...a, icon: a.icon.name })))
    );

    history.goBack();
  }

  return (
    <div className="EditItem">
      <h3>App name</h3>
      <input
        type="text"
        value={appName}
        onChange={(e) => setAppName(e.target.value)}
      />
      <span className={errors && errors[0] ? "visible" : ""}>
        {errors && errors[0] ? errors[0] : ""}
      </span>
      <hr />
      <h3>Password</h3>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span className={errors && errors[1] ? "visible" : ""}>
        {errors && errors[1] ? errors[1] : ""}
      </span>
      <hr />
      <h3>Auth code (optional)</h3>
      <input
        type="text"
        value={authCode}
        onChange={(e) => setAuthCode(e.target.value)}
      />
      <span className={errors && errors[2] ? "visible" : ""}>
        {errors && errors[2] ? errors[2] : ""}
      </span>
      <hr />
      <h3>Recovery Codes (optional)</h3>
      <div>
        {recoveryCodes.map((code, i) => (
          <input
            type="text"
            key={i}
            className="chipInput"
            value={code}
            onChange={(e) => {
              const newCodes = [...recoveryCodes];
              newCodes[i] = e.target.value;
              if (newCodes[newCodes.length - 1].length !== 0) newCodes.push("");

              if (
                newCodes[newCodes.length - 1].length === 0 &&
                newCodes[newCodes.length - 2]?.length === 0
              )
                newCodes.pop();
              setRecoveryCodes(newCodes);
            }}
          />
        ))}
      </div>
      <span className={errors && errors[3] ? "visible" : ""}>
        {errors && errors[3] ? errors[3] : ""}
      </span>
      <hr />
      <button aria-label="Save app" type="submit" onClick={() => editApp()}>
        Save
      </button>
    </div>
  );
}

export default EditItem;
