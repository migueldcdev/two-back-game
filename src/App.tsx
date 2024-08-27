import { InsertNameScreen } from "./components/InsertNameScreen";

const App = () => {
  return (
    <main className="flex items-center justify-center h-screen bg-slate-300">
      <div className="w-3/4 md:w-1/3 p-2 rounded">
        <InsertNameScreen />
      </div>
    </main>
  );
};

export default App;
