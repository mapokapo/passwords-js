import App from "./App";

export type UserDataContextType = {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  passwordHash: string;
  setPasswordHash: (pass: string) => void;
  apps: App[];
  setApps: (apps: App[]) => void;
};
