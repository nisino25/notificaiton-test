import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

// 🔥 Import Firebase dependencies
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// 🔥 Firebase Configuration (Replace with your actual credentials)
const firebaseConfig = {
  apiKey: "AIzaSyA4jKARkIbs-W20TM_HWtM4JEvoGRp4mho",
  authDomain: "audio-memory-1a8ad.firebaseapp.com",
  projectId: "audio-memory-1a8ad",
  storageBucket: "audio-memory-1a8ad.firebasestorage.app",
  messagingSenderId: "1017691667808",
  appId: "1:1017691667808:web:dfd6db7fba722dc8fc3205",
  measurementId: "G-Y1K15GG0J0"
};

// 🔥 Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// ✅ Function to Request Notification Permission and Get FCM Token
const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BIVwgl8OgFD_w90IN1zbB2fR7quTIwW3TA9ddS5Q-fZTMasOqsnWrqimjdzWmirb7r_e0hBm0zhM6fzqNc6siZo" // ✅ Using your actual VAPID key here
      });
      console.log("🔥 FCM Token:", token);
    } else {
      console.log("🚫 Notification permission denied");
    }
  } catch (error) {
    console.error("⚠️ Error getting FCM token:", error);
  }
};

// ✅ Call the function to request notification permission when the app loads
requestNotificationPermission();

// ✅ Listen for foreground notifications
onMessage(messaging, (payload) => {
  console.log("📩 Foreground notification received:", payload);
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png"
  });
});

// ✅ Register the Firebase Messaging Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("✅ Service Worker registered successfully:", registration);
    })
    .catch((error) => {
      console.error("❌ Service Worker registration failed:", error);
    });
}

// ✅ Mount Vue App
createApp(App).mount("#app");
