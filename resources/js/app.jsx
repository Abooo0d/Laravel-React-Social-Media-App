import "./bootstrap";
import "animate.css";
import "./Components/Shared/index.css";
import "../css/app.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { MainContext } from "./Contexts/MainContext";
import { UserContext } from "./Contexts/UserContext";
import { ChatsContext } from "./Contexts/ChatsContext";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx")
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <UserContext>
        <MainContext>
          <ChatsContext>
            <App {...props} style={{ height: "100vh" }} />
          </ChatsContext>
        </MainContext>
      </UserContext>
    );
  },
  progress: {
    color: "#4B5563",
  },
});
