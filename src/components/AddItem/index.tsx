import React, { useContext, useState } from "react";
import "./index.css";
import randomColor from "randomcolor";

import * as faIcons from "react-icons/fa";
import { MdLock } from "react-icons/md";
import App from "../../classes/App";
import { UserDataContext } from "../../context/UserPassContext";
import { useHistory } from "react-router";

function AddItem() {
  const [appName, setAppName] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([""]);
  const [errors, setErrors] = useState<(string | undefined)[] | null>(null);
  const { apps, setApps } = useContext(UserDataContext);
  const history = useHistory();

  function addApp() {
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
    if (errors) return;
    const icons = Object.entries(faIcons);
    let appIcon = MdLock;
    if (icons.map((arr) => arr[0]).includes(appName)) {
      appIcon = icons.find((arr) => arr[0] === appName)![1];
    }

    const app: App = {
      id: Math.floor(Math.random() * 10000000000),
      name: appName,
      defaultColor: randomColor(),
      icon: appIcon,
      authCode: authCode.length !== 0 ? authCode : null,
      recoveryCodes:
        recoveryCodes[recoveryCodes.length - 1]?.length === 0
          ? recoveryCodes.slice(0, -1)
          : recoveryCodes,
      password,
      selected: false,
    };

    const _app = {
      ...app,
      icon: appIcon.name,
    };

    const appsString = localStorage.getItem("apps");
    localStorage.setItem(
      "apps",
      appsString
        ? JSON.stringify([...(JSON.parse(appsString) as App[]), _app])
        : JSON.stringify([_app])
    );
    setApps([...apps, app]);

    history.goBack();
  }

  return (
    <div className="AddItem">
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
      <button type="submit" onClick={() => addApp()}>
        Add
      </button>
    </div>
  );
}

export default AddItem;
