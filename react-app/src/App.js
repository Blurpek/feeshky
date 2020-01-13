import React, { useState } from 'react';
import Flashcard from './components/Flashcard/Flashcard';
import { ThemeContext, themes } from './ThemeContext';
import * as idiomsDeck from './assets/decks/idiomsDeck.json'

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  const [currentDeck, setCurrentDeck] = useState(shuffle(idiomsDeck.default))
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  
  const handleAnswered = () => {
    setCurrentCardIndex(currentCardIndex < currentDeck.length - 1 ? currentCardIndex + 1 : 0)
  }

  return (
    <ThemeContext.Provider value={themes.classic}>
      <Flashcard card={currentDeck[currentCardIndex]} onAnswered={handleAnswered} />
    </ThemeContext.Provider>
  )
}

export default App;
