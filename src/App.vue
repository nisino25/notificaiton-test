<template>
  <div>
    <h1>🔥 Your FCM Token</h1>
    <p v-if="fcmToken">Copy this token: <br> <code>{{ fcmToken }}</code></p>
    <p v-else>Loading FCM token...</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getMessaging, getToken } from "firebase/messaging";

export default {
  setup() {
    const fcmToken = ref("");

    onMounted(async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const messaging = getMessaging();
          const token = await getToken(messaging, {
            vapidKey: "BIVwgl8OgFD_w90IN1zbB2fR7quTIwW3TA9ddS5Q-fZTMasOqsnWrqimjdzWmirb7r_e0hBm0zhM6fzqNc6siZo"
          });
          fcmToken.value = token;
          console.log("🔥 FCM Token:", token);
        } else {
          console.log("🚫 Notification permission denied");
        }
      } catch (error) {
        console.error("⚠️ Error getting FCM token:", error);
      }
    });

    return { fcmToken };
  }
};
</script>
