import { useState } from "react";
import { useGameContext } from "../../context/GameContext";

export const InsertNameScreen = () => {
  const { gamePhaseDispatch } = useGameContext();

  const [name, setName] = useState("");

  const nameLength = name.length;

  function handleInputName(value: string) {
    setName(value);
  }

  return (
    <section>
      <div className="flex items-center justify-center flex-col">
        <p className="text-slate-600  text-xl">Enter your name and press start:</p>
        <label className="text-xs mt-2 text-slate-600 mb-1" htmlFor="name">
          Your name
        </label>
        <input
          className="p-2 bg-slate-400 rounded"
          type="text"
          id="name"
          autoFocus
          placeholder="Jane"
          onChange={(e) => {
            handleInputName(e.target.value);
          }}
        />
        {nameLength < 1 ? (
          <button className="px-4 py-2 bg-green-300 rounded text-white text-xl mt-4" disabled>
            Start
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 rounded text-white text-xl mt-4"
            onClick={() => {
              gamePhaseDispatch({ type: "increment" });
            }}
          >
            Start
          </button>
        )}
      </div>
      <article className="p-4 mx-6 my-4 bg-slate-600 text-slate-200 rounded text-sm mt-12">
        <h2 className="text-xl">Instructions</h2>
        <p className="mt-2">
          In this task, you will see letters. Each letter is shown for a few seconds. You need to decide if you saw the
          same letter two letters ago.
        </p>
        <p className="mt-2">
          If you saw the same letter 2 letters ago, you click or tap on the screen. If you did correctly, you see{" "}
          <span className="text-green-500">green</span> colors around the letter, otherwise you will see{" "}
          <span className="text-red-500">red</span> around the letter.
        </p>
      </article>
    </section>
  );
};
