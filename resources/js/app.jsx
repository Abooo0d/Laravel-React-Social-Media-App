// import "./bootstrap";
// import "animate.css";
// import "./Components/Shared/index.css";
// // import "../css/app.css";
// import { createRoot } from "react-dom/client";
// import { createInertiaApp } from "@inertiajs/react";
// import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
// import { MainContext } from "./Contexts/MainContext";
// import { UserContext } from "./Contexts/UserContext";
// import { ChatsContext } from "./Contexts/ChatsContext";

// const appName = import.meta.env.VITE_APP_NAME || "Laravel";

// createInertiaApp({
//   title: (title) => `${title} - ${appName}`,
//   resolve: (name) =>
//     resolvePageComponent(
//       `./Pages/${name}.jsx`,
//       import.meta.glob("./Pages/**/*.jsx")
//     ),
//   setup({ el, App, props }) {
//     const root = createRoot(el);
//     root.render(
//       <UserContext>
//         <MainContext>
//           <ChatsContext>
//             <App {...props} style={{ height: "100vh" }} />
//           </ChatsContext>
//         </MainContext>
//       </UserContext>
//     );
//   },
//   progress: {
//     color: "#4B5563",
//   },
//   title: (title) => `MyApp - ${title}`,
//   resolveComponent: async (name) => {
//     const page = await import(`./Pages/${name}.jsx`);
//     return page.default;
//   },
//   // 👇 Add this to avoid a white flash on first load
//   loading: () => (
//     <div className="flex justify-center items-center h-screen bg-red-500">
//       Loading...
//     </div>
//   ),
// });

// import "./bootstrap";
// import "animate.css";
// import "./Components/Shared/index.css";
// import "../css/app.css";

// import { createRoot } from "react-dom/client";
// import { createInertiaApp } from "@inertiajs/react";
// import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

// import { MainContext } from "./Contexts/MainContext";
// import { UserContext } from "./Contexts/UserContext";
// import { ChatsContext } from "./Contexts/ChatsContext";

// const appName = import.meta.env.VITE_APP_NAME || "Laravel";

// createInertiaApp({
//   title: (title) => `${title} - ${appName}`,
//   resolve: (name) =>
//     resolvePageComponent(
//       `./Pages/${name}.jsx`,
//       import.meta.glob("./Pages/**/*.jsx")
//     ),
//   setup({ el, App, props }) {
//     const root = createRoot(el);
//     root.render(
//       <UserContext>
//         <MainContext>
//           <ChatsContext>
//             <App {...props} />
//           </ChatsContext>
//         </MainContext>
//       </UserContext>
//     );
//   },
//   progress: {
//     color: "#4B5563", // dark gray-ish progress bar
//   },
//   loading: () => (
//     <div className="flex justify-center items-center h-screen bg-red-500 text-gray-700">
//       <div className="text-xl animate-pulse">Loading...</div>
//     </div>
//   ),
// });

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
