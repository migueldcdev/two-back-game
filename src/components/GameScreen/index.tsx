export const GameScreen = () => {
  
  const currentLetter = 'A';

  return (
    <section className="text-9xl text-center">
      <div className="text-slate-800"> 
        <span className="text-slate-400">[</span> {currentLetter} <span className="text-slate-400">]</span> 
      </div>
    </section>
  )
};
