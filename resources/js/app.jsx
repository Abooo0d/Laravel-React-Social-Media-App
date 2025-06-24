import { Buffer } from "buffer";
import process from "process";

window.Buffer = Buffer;
window.process = process;
import "./bootstrap";
import "animate.css";
import "./Components/Shared/index.css";
import "../css/app.css";
// import "unreset-css/dist/unreset.min.css"; // Restores default styles
import "unreset-css/dist/unreset.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

import { MainContext } from "./Contexts/MainContext";
import { UserContext } from "./Contexts/UserContext";
import { ChatsContext } from "./Contexts/ChatsContext";
import { StrictMode } from "react";
import { QueryProvider } from "./TanStackQurey/QueryProvider";

const appName = import.meta.env.APP_NAME || "Laravel";

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
      <QueryProvider>
        <UserContext>
          <MainContext>
            <ChatsContext>
              <StrictMode>
                <App {...props} />
              </StrictMode>
            </ChatsContext>
          </MainContext>
        </UserContext>
      </QueryProvider>
    );
  },
  progress: {
    color: "#4B5563",
  },
});
