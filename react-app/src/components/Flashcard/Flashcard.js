import React, { useState } from 'react'
import PromptSide from '../PromptSide/PromptSide';
import AnswerSide from '../AnswerSide/AnswerSide';
import './Flashcard.css'


const flashcardStyles = {
  margin: '20px', 
  width: '760px', 
  height: '500px',
  display: 'flex'
}

function Flashcard({ card, onAnswered }) {
  const [isReversed, setReversed] = useState(false)

  const handleLowerSideClicked = () => {
    isReversed && onAnswered()
    
    setReversed(!isReversed)
  }

  return (
    <div style={flashcardStyles}>
      <PromptSide prompt={card[0]} isReversed={isReversed} />
      <AnswerSide answer={card[1]} isReversed={isReversed} onClick={handleLowerSideClicked} />
    </div>
  )
}

export default Flashcard
