interface App {
  id: number;
  name: string;
  defaultColor: string;
  icon: Function;
  password: string;
  authCode: string | null;
  recoveryCodes: string[];
}

export default App;
