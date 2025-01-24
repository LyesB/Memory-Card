import "./App.css"
import Card from "./components/card.jsx"

export default function App() {
  return (
    <div className="h-screen w-full grid items-end justify-items-center bg-[#A6CDC6] text-[#727D73] ">
      <h1 className="font-bold text-3xl font-mono ">
        Memory Card Game: Click Once Challenge
      </h1>
      <div>
        <h2 className="font-bold text-xl font-mono ">Objective:</h2>
        <div className=" text-lg font-mono ">
          The goal of the game is to click every card on the screen exactly
          once. If you click a card a second time, you lose the game.
        </div>
      </div>
      <Card />
    </div>
  )
}
