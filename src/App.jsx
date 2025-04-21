import { useEffect, useState } from "react";
import "./App.css";
import { fetchPokemonImages } from "./utils/api";
import { shuffleArray } from "./utils/shuffle";
import Card from "./components/Card";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    async function getData() {
      const pokemons = await fetchPokemonImages(8);
      setCards(shuffleArray(pokemons));
    }

    getData();
  }, []);

  function handleCardClick(name) {
    if (clicked.includes(name)) {
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      setClicked([]);
      setCards(shuffleArray(cards));
      return;
    }

    const newClicked = [...clicked, name];
    const newScore = score + 1;
    setClicked(newClicked);
    setScore(newScore);

    if (newClicked.length === cards.length) {
      setTimeout(() => {
        alert("🎉 You Win!");
        setScore(0);
        setClicked([]);
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        setCards(shuffleArray(cards));
      }, 100);
    } else {
      setCards(shuffleArray(cards));
    }
  }

  return (
    <div className="app-container">
      <h1>Memory Game</h1>
      <ScoreBoard score={score} bestScore={bestScore} />
      <p className="instructions">
        Click each Pokémon only once. Don't click the same one twice!
      </p>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.name}
            image={card.image}
            name={card.name}
            handleClick={() => {
              handleCardClick(card.name);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
