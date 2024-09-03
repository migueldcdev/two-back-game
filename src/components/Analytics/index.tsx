import { useEffect, useState } from "react";

export const Analytics = () => {
  const [currentEvent, setCurrentEvent] = useState<string | null>(null);

  function listenUserEvents() {
    window.addEventListener("click", (e) => {
      console.log(e);
      setCurrentEvent("clicked");
    });
  }

  useEffect(() => {
    listenUserEvents();
  }, []);

  return <div>{currentEvent}</div>;
};
