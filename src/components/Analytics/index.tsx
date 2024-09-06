import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useGameContext } from "../../context/GameContext";

export const Analytics = () => {
  const { gameState } = useGameContext();
  const { analytics, notification } = gameState;

  useEffect(() => {
    if (analytics) {
      toast.success(notification);
    }
  }, [notification, analytics]);

  return <Toaster position="top-right" />;
};
