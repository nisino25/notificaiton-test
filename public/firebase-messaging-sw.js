importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyA4jKARkIbs-W20TM_HWtM4JEvoGRp4mho",
  authDomain: "audio-memory-1a8ad.firebaseapp.com",
  projectId: "audio-memory-1a8ad",
  storageBucket: "audio-memory-1a8ad.firebasestorage.app",
  messagingSenderId: "1017691667808",
  appId: "1:1017691667808:web:dfd6db7fba722dc8fc3205",
  measurementId: "G-Y1K15GG0J0"
});

// const firebaseConfig = {
//   apiKey: "AIzaSyA4jKARkIbs-W20TM_HWtM4JEvoGRp4mho",
//   authDomain: "audio-memory-1a8ad.firebaseapp.com",
//   projectId: "audio-memory-1a8ad",
//   storageBucket: "audio-memory-1a8ad.firebasestorage.app",
//   messagingSenderId: "1017691667808",
//   appId: "1:1017691667808:web:dfd6db7fba722dc8fc3205",
//   measurementId: "G-Y1K15GG0J0"
// };

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background notification:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png"
  });
});
