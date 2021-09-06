import React from "react";
import "./index.css";
import { MdChevronRight } from "react-icons/md";
import App from "../../classes/App";
import { Link, useRouteMatch } from "react-router-dom";

interface Props {
  app: App;
  setSelected: Function;
}

type Params = { appId: string };

function AppTile(props: Props) {
  const { app, setSelected } = props;
  const route = useRouteMatch<Params>({
    path: "/:appId?",
    exact: true,
  });
  const appId = route?.params.appId;

  return (
    <Link to={app.id.toString()} onClick={() => setSelected(true)}>
      {appId === app.id.toString() && <MdChevronRight size={24} />}
      <div
        className="AppTile"
        style={{ backgroundColor: app.defaultColor }}
        onClick={() => {}}
      >
        <app.icon size={24} />
        <span>{app.name}</span>
      </div>
    </Link>
  );
}

export default AppTile;
