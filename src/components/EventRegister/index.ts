import { useEffect } from "react"

export const EventRegister = () => {

    const win = window;

    function eventListener(window: Window) {
        Object.keys(window).forEach(key => {
            if (/^on/.test(key)) {
                window.addEventListener(key.slice(2), event => {
                    console.log(event);
                });
            }
        });
    }   

    useEffect(()=> {
        eventListener(win)
    }, [win])

    return null
}