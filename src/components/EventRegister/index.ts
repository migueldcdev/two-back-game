import { useEffect } from "react";

export const EventRegister = () => {
  function eventListener() {
    Object.keys(window).forEach((key) => {
      if (/^on/.test(key)) {
        window.addEventListener(key.slice(2), (event) => {
          console.log(event);
        });
      }
    });
  }

  useEffect(() => {
    eventListener();
  }, []);

  return null;
};
