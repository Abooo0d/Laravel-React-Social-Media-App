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

// window.Echo = new Echo({
//   broadcaster: "pusher",
//   key: import.meta.env.VITE_PUSHER_APP_KEY,
// cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? "mt1",
// wsHost: import.meta.env.VITE_PUSHER_HOST
//   ? import.meta.env.VITE_PUSHER_HOST
//   : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//   wsPort: import.meta.env.VITE_PUSHER_PORT ?? 6001,
//   wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//   forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? "https") === "https",
//   enabledTransports: ["ws", "wss"],
// });
// window.Echo = new Echo({
//   broadcaster: "pusher",
//   key: import.meta.env.VITE_PUSHER_APP_KEY,
//   cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? "mt1",
//   wsHost: import.meta.env.VITE_PUSHER_HOST
//     ? import.meta.env.VITE_PUSHER_HOST
//     : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//   wsPort: import.meta.env.VITE_PUSHER_PORT ?? 6001,
//   wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//   forceTLS: false,
//   // disableStats: true,
//   enabledTransports: ["ws", "wss"],
// });

window.Echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY, // must match PUSHER_APP_KEY
  cluster: "mt1",
  wsHost: "192.168.1.107", // or your IP if you're testing on another device
  wsPort: 6001,
  forceTLS: false,
  enabledTransports: ["ws"],

  // broadcaster: "pusher",
  // key: import.meta.env.VITE_REVERB_APP_KEY,
  // wsHost: "192.168.1.107",
  // wsPort: 6001,
  // wssPort: 6001,
  // forceTLS: false,
  // forceTLS: true,
  // encrypted: false,
  // encrypted: true,
  // disableStats: true,
  // enabledTransports: ["ws"],
  // enabledTransports: ["ws", "wss"],
});
