import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// ✅ Use your correct Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA4jKARkIbs-W20TM_HWtM4JEvoGRp4mho",
  authDomain: "audio-memory-1a8ad.firebaseapp.com",
  projectId: "audio-memory-1a8ad",
  storageBucket: "audio-memory-1a8ad.appspot.com",
  messagingSenderId: "1017691667808",
  appId: "1:1017691667808:web:dfd6db7fba722dc8fc3205",
  measurementId: "G-Y1K15GG0J0"
};

// ✅ Initialize Firebase (Service Worker Version)
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// ✅ Handle background messages
onBackgroundMessage(messaging, (payload) => {
  console.log("📩 Background notification received:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png"
  });
});
