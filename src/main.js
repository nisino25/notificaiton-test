import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

// Firebase Imports
import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// ✅ Use your correct Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA4jKARkIbs-W20TM_HWtM4JEvoGRp4mho",
  authDomain: "audio-memory-1a8ad.firebaseapp.com",
  projectId: "audio-memory-1a8ad",
  storageBucket: "audio-memory-1a8ad.appspot.com", // Fixed typo here
  messagingSenderId: "1017691667808",
  appId: "1:1017691667808:web:dfd6db7fba722dc8fc3205",
  measurementId: "G-Y1K15GG0J0"
};

// ✅ Prevent duplicate Firebase initialization
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

const messaging = getMessaging(firebaseApp);

const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BIVwgl8OgFD_w90IN1zbB2fR7quTIwW3TA9ddS5Q-fZTMasOqsnWrqimjdzWmirb7r_e0hBm0zhM6fzqNc6siZo"
      });

      console.log("🔥 FCM Token:", token);
    } else {
      console.log("🚫 Notification permission denied");
    }
  } catch (error) {
    console.error("⚠️ Error getting FCM token:", error);
  }
};

// ✅ Handle messages when app is open
onMessage(messaging, (payload) => {
  console.log("📩 Foreground notification received:", payload);
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png"
  });
});

// Call permission function
requestNotificationPermission();

createApp(App).mount("#app");
