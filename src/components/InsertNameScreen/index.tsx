import { FormEvent, useState } from "react";
import { useGameContext } from "../../context/GameContext";

import toggleOffUrl from "../../assets/toggle-off.png";
import toggleOnUrl from "../../assets/toggle-on.png";

export const InsertNameScreen = () => {
  const { gameState, gameDispatch } = useGameContext();

  const { showAnalyticsNotifications, userName = "" } = gameState;

  const [name, setName] = useState(userName);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    gameDispatch({ type: "START_GAME", userName: name });
  }

  return (
    <section className="border rounded p-6 bg-white">
      <div className="flex flex-col">
        <p className="text-slate-800 text-xl font-bold my-6">Welcome to Two Back Game:</p>
        <hr />
        <form className="flex flex-col mt-4" onSubmit={(e) => handleSubmit(e)}>
          <label className="mt-2 text-slate-800 mb-1" htmlFor="name">
            Your name
          </label>
          <input
            value={name}
            className="p-2 rounded border"
            type="text"
            id="name"
            autoFocus
            placeholder="e.g. Jane"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <input
            type="submit"
            value={"Start"}
            className="px-4 py-2 bg-green-600 rounded text-white text-xl mt-4 cursor-pointer hover:bg-green-500"
          />
        </form>
      </div>
      <article className="p-4 mx-6 my-4 bg-slate-100 rounded text-sm my-12">
        <h2 className="text-xl">&#9432; Instructions</h2>
        <p className="mt-2">
          In this task, you will see letters. Each letter is shown for a few seconds. You need to decide if you saw the
          same letter two letters ago.
        </p>
        <p className="mt-2">
          If you saw the same letter 2 letters ago, you click on the big green button. If you did correctly, you will
          see <span className="text-green-600">green</span> colors around the letter, otherwise you will see{" "}
          <span className="text-red-600">red</span> around the letter.
        </p>
      </article>
      <hr />
      <div className="flex justify-end mt-6">
        <div className="flex gap-1">
          <label htmlFor="toggle-button" className="mt-3 text-slate-800">
            Activate analytics
          </label>
          <button id="toggle-button" onClick={() => gameDispatch({ type: "SET_ANALYTICS_NOTIFICATIONS" })}>
            <img
              src={showAnalyticsNotifications ? toggleOnUrl : toggleOffUrl}
              width={"50px"}
              className="cursor-pointer"
              alt={showAnalyticsNotifications ? "button toggled on" : "button toggled off"}
            />
          </button>
        </div>
      </div>
    </section>
  );
};
