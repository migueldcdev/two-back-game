import { useState } from "react";
import { useGameContext } from "../../context/GameContext";

import toggleOnUrl from '../../assets/toggle-on.png';
import toggleOffUrl from '../../assets/toggle-off.png'

export const InsertNameScreen = () => {
  const { gameState, gameDispatch } = useGameContext();

  const [name, setName] = useState("");

  function handleSubmit() {
    gameDispatch({ type: "setUserName", userName: name });
  }
  
  return (
    <section>
      <div className="flex items-center justify-center flex-col">
        <p className="text-slate-800 text-xl">Enter your name and press start:</p>
        <form
          className="flex flex-col mt-4"
          onSubmit={() => {
            handleSubmit();
          }}
        >
          <label className="text-xs mt-2 text-slate-800 mb-1" htmlFor="name">
            Your name
          </label>
          <input
            className="p-2 bg-slate-500 rounded placeholder-slate-400 text-slate-200"
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
            className="px-4 py-2 bg-green-500 rounded text-white text-xl mt-4 cursor-pointer hover:bg-green-600"
          />
        </form>
      </div>
      <article className="p-4 mx-6 my-4 bg-slate-600 text-slate-200 rounded text-sm mt-12">
        <h2 className="text-xl">Instructions</h2>
        <p className="mt-2">
          In this task, you will see letters. Each letter is shown for a few seconds. You need to decide if you saw the
          same letter two letters ago.
        </p>
        <p className="mt-2">
          If you saw the same letter 2 letters ago, you click on the big green button. If you did correctly, you see{" "}
          <span className="text-green-500">green</span> colors around the letter, otherwise you will see{" "}
          <span className="text-red-500">red</span> around the letter.
        </p>
      </article>
      <div className="flex justify-end gap-4 p-6">
        <p className="mt-3 text-slate-800">Activate analytics</p>
        <button onClick={() => gameDispatch({ type: 'setAnalytics' })}>
          <img
            src={gameState.analytics ? toggleOnUrl : toggleOffUrl}
            width={'50px'}
            className="cursor-pointer"
          />
        </button>
      </div>
    </section>
  );
};
