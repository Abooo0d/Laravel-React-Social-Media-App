/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from "laravel-echo";

import Pusher from "pusher-js";
window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  wsHost: import.meta.env.VITE_PUSHER_HOST,
  wssHost: import.meta.env.VITE_PUSHER_HOST,
  wsPort: import.meta.env.VITE_PUSHER_PORT,
  wssPort: import.meta.env.VITE_PUSHER_PORT,
  forceTLS: true,
  encrypted: true,
  disableStats: true,
});

// import { Buffer } from "buffer";
// import process from "process";

// window.Buffer = Buffer;
// window.process = process;
// http;
// window.Echo = new Echo({
//   broadcaster: "pusher",
//   key: import.meta.env.VITE_PUSHER_APP_KEY, // must match PUSHER_APP_KEY
//   cluster: "mt1",
//   wsHost: "192.168.1.109", // or your IP if you're testing on another device
//   wsPort: 6001,
//   forceTLS: false,
//   encrypted: false,
//   enabledTransports: ["ws"],
// });
// window.Echo = new Echo({
//   broadcaster: "pusher",
//   key: import.meta.env.VITE_PUSHER_APP_KEY,
//   cluster: "mt1",
//   wsHost: "192.168.1.109",
//   wsPort: 6001,
//   forceTLS: false,
//   encrypted: false,
//   enabledTransports: ["ws"],
//   disableStats: true,
//   wsOptions: {
//     transports: ["websocket"],
//     upgrade: false,
//     rejectUnauthorized: false,
//   },
// });
