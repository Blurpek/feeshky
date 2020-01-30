import React, { useState } from 'react'
import PromptSide from '../PromptSide/PromptSide';
import AnswerSide from '../AnswerSide/AnswerSide';

const flashcardStyles = {
  margin: '20px', 
  width: '760px', 
  height: '490px',
  display: 'flex'
}

function Flashcard({ card, onAnswered }) {
  const [isReversed, setReversed] = useState(false)

  const handleAnswerSideClicked = () => {
    isReversed && onAnswered()
    
    setReversed(!isReversed)
  }

  return (
    <div style={flashcardStyles}>
      <PromptSide prompt={card[0]} isReversed={isReversed} />
      <AnswerSide answer={card[1]} isReversed={isReversed} onClick={handleAnswerSideClicked} />
    </div>
  )
}

export default Flashcard
