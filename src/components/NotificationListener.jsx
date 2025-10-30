import { useEffect } from "react";
import { io } from "socket.io-client";

export default function NotificationListener({ userId, onNotify }) {
  useEffect(() => {
    if (!userId) return;

    const socket = io("https://monoxapi.onrender.com", {
      transports: ["websocket"],
      secure: true,
    });

    socket.on(`notification-${userId}`, (data) => {
      console.log("🔔 New notification:", data);
      onNotify(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, onNotify]);

  return null;
}
