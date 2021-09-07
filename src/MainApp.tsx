import React, { useState } from "react";
import { Switch, Route } from "react-router";
import "./MainApp.css";
import App from "./classes/App";
import AddItem from "./components/AddItem";
import AppInfo from "./components/AppInfo";
import AppList from "./components/AppList";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import StatusBar from "./components/StatusBar";
import { UserDataContext } from "./context/UserPassContext";
import * as faIcons from "react-icons/fa";
import { MdLock } from "react-icons/md";
import EditItem from "./components/EditItem";

function MainApp() {
  let [passwordHash, setPasswordHash] = useState("");
  let [loggedIn, setLoggedIn] = useState(false);
  let [apps, setApps] = useState<App[]>([]);

  const savedPasswordHash = localStorage.getItem("passwordHash");
  if (savedPasswordHash) passwordHash = savedPasswordHash;

  const loginTimestamp = localStorage.getItem("loggedInTimestamp");
  if (loginTimestamp)
    loggedIn =
      (Date.now() - parseInt(loginTimestamp)) / (1000 * 60 * 60 * 24) < 1;

  const appsString = window.localStorage.getItem("apps");
  let _apps: any[] = [];
  if (appsString) _apps = JSON.parse(appsString);
  const icons = Object.entries(faIcons);
  apps = _apps.map((o) => {
    const app: App = {
      ...o,
      icon:
        o.icon === "MdLock" ? MdLock : icons.find((i) => i[0] === o.icon)![1],
    };
    return app;
  });

  console.log(loggedIn);

  return (
    <UserDataContext.Provider
      value={{
        passwordHash,
        setPasswordHash,
        loggedIn,
        setLoggedIn,
        apps,
        setApps,
      }}
    >
      <div className="MainApp">
        <StatusBar />
        <main>
          {passwordHash === "" ? (
            <RegisterPage />
          ) : !loggedIn ? (
            <LoginPage />
          ) : (
            <>
              <AppList />
              <Switch>
                <Route path="/add" component={AddItem} />
                <Route path="/edit/:appId?" component={EditItem} />
                <Route path="/:appId?" component={AppInfo} />
              </Switch>
            </>
          )}
        </main>
      </div>
    </UserDataContext.Provider>
  );
}

export default MainApp;
