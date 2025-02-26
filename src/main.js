import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

// 🔥 Import Firebase dependencies
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

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


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BIVwgl8OgFD_w90IN1zbB2fR7quTIwW3TA9ddS5Q-fZTMasOqsnWrqimjdzWmirb7r_e0hBm0zhM6fzqNc6siZo"
      });

      console.log("🔥 FCM Token:", token);
      
      // ✅ Auto-subscribe all users to "audio-memory" topic
      fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/audio-memory`, {
        method: "POST",
        headers: {
          "Authorization": `key=YOUR_SERVER_KEY`,
          "Content-Type": "application/json"
        }
      }).then(response => {
        if (response.ok) {
          console.log("✅ Subscribed to topic: audio-memory");
        } else {
          console.error("❌ Failed to subscribe:", response);
        }
      });

    } else {
      console.log("🚫 Notification permission denied");
    }
  } catch (error) {
    console.error("⚠️ Error getting FCM token:", error);
  }
};

// Call permission function
requestNotificationPermission();

createApp(App).mount("#app");