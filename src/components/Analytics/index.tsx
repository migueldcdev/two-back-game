import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useGameContext } from "../../context/GameContext";

export const Analytics = () => {
  const { gameState } = useGameContext();
  const {showAnalyticsNotifications, notification } = gameState;

  useEffect(() => {
    if (showAnalyticsNotifications) {
      toast.success(notification);
    }
  }, [notification, showAnalyticsNotifications]);

  return <Toaster position="top-right" />;
};
