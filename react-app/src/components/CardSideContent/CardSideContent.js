import React from 'react'
import './CardSideContent.css'

function CardSideContent({ content }) {
  return content.image ? (
    <div className="flex-container">
      <h1 className="row" style={{  }}>
        <img src={'data:image/png;base64,' + content.image} />
      </h1>
    </div>
  ) : (
    <div className="flex-container">
      <h1 className="row" style={{ marginTop: content?.text?.length < 100 ? '30%' : 0 }}>{ content?.text }</h1>
    </div>
  )
}

export default CardSideContent
