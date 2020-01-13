import React from 'react'
import './CardSideContent.css'

function CardSideContent({ content }) {
  return (
    <div className="flex-container">
      <h1 className="row" style={{ marginTop: content?.text?.length < 100 ? '30%' : 0 }}>{ content && content.text }</h1>
    </div>
  )
}

export default CardSideContent
