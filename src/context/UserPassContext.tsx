import React from "react";
import App from "../classes/App";
import { UserDataContextType } from "../classes/UserDataContextType";

export const UserDataContext = React.createContext<UserDataContextType>({
  passwordHash: "",
  setPasswordHash: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  apps: [],
  setApps: (apps: App[]) => {},
});
