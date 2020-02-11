import React, { useState } from 'react';
import Flashcard from './components/Flashcard/Flashcard';
import { ThemeContext, themes } from './ThemeContext';
import Settings from './components/Settings/Settings';
import { useEffect } from 'react';
import * as idiomsDeck from './assets/decks/idiomsDeck.json'

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  const [decks, setDecks] = useState([idiomsDeck.default])
  const [currentDeck, setCurrentDeck] = useState({ ...decks[0], cards: shuffle(decks[0].cards) })
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [currentTheme, setCurrentTheme] = useState(themes.orangeTeal)
  
  useEffect(() => {
    browser.storage.sync.get().then(result => { 
    const userSet = JSON.parse(result.userSet)
      if (userSet?.length > 0) {
        setDecks(userSet)
        result.currentDeck && setCurrentDeck(result.currentDeck)
        result.currentCardIndex && setCurrentCardIndex(result.currentCardIndex)
      }
      result.currentTheme && handleThemeChange(result.currentTheme)
    })
  }, [])

  useEffect(() => {
    browser.storage.sync.set({ currentDeck: currentDeck, currentCardIndex: currentCardIndex, currentTheme: currentTheme })
  }, [currentDeck, currentCardIndex, currentTheme])

  const handleAnswered = () => {
    setCurrentCardIndex(currentCardIndex < currentDeck.cards.length - 1 ? currentCardIndex + 1 : 0)
  }

  const handleDeckChange = chosenDeck => {
    setCurrentCardIndex(0)
    setCurrentDeck({ ...chosenDeck, cards: shuffle(chosenDeck.cards) })
  }

  const handleReverse = () => {
    setCurrentDeck({ ...currentDeck, cards: currentDeck.cards.map(card => card.reverse()) })
  }

  const handleThemeChange = chosenTheme => {
    document.body.style.backgroundColor = chosenTheme.backgroundColor.main
    document.body.style.color = chosenTheme.textColor.main
    setCurrentTheme(chosenTheme)
  }

  return (
    <ThemeContext.Provider value={currentTheme}>
      <Settings 
        decks={decks} 
        currentDeck={currentDeck} 
        onDeckChange={handleDeckChange} 
        onReverse={handleReverse} 
        themes={themes} 
        currentTheme={currentTheme} 
        onThemeChange={handleThemeChange} 
      />
      <Flashcard card={currentDeck.cards[currentCardIndex]} onAnswered={handleAnswered} />
    </ThemeContext.Provider>
  )
}

export default App;
