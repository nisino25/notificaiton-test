<template>
  <div>
    <button @click="sendNotification">Send Notification in 5 Seconds</button>
  </div>
</template>

<script setup>
// import { ref } from "vue";

const sendNotification = () => {
  // Check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support notifications.");
    return;
  }

  // Request permission from the user
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      setTimeout(() => {
        new Notification("🚀 Notification Alert!", {
          body: "This is a scheduled notification after 5 seconds!",
          icon: "/icon.png",
        });
      }, 5000); // 5 seconds delay
    } else {
      alert("Notification permission denied!");
    }
  });
};
</script>
