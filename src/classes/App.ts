interface App {
  id: number;
  selected: boolean;
  name: string;
  defaultColor: string;
  icon: Function;
  password: string;
  authCode: string | null;
  recoveryCodes: string[];
}

export default App;
