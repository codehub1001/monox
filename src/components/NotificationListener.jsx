import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://monoxapi.onrender.com");

export default function NotificationListener({ userId, onNotify }) {
  useEffect(() => {
    if (!userId) return;

    socket.on(`notification-${userId}`, (data) => {
      console.log("🔔 New notification:", data);
      onNotify(data);
    });

    return () => socket.off(`notification-${userId}`);
  }, [userId, onNotify]);

  return null;
}
