import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useGameContext } from "../../context/GameContext";

export const Analytics = () => {
  const { gameState } = useGameContext();

  function showToastNotificacion() {
    if (gameState.analytics) {
      toast.success(gameState.notification);
    }
  }

  useEffect(() => {
    showToastNotificacion();
  }, [gameState.notification]);

  return <Toaster position="top-right" />;
};
