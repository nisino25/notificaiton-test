import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

// Register the Firebase messaging service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered successfully:", registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

createApp(App).mount("#app");
