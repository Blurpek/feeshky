import React, { useContext } from 'react'
import useAudio from '../../hooks/useAudio'
import { ThemeContext } from '../../ThemeContext';
import './CardSideContent.css'
import { ReactComponent as MusciNoteIcon } from '../../assets/icons/music-note.svg'

function CardSideContent({ content }) {
  const { switchPlayOrStop } = useAudio(content.audio)
  const theme = useContext(ThemeContext)

  return (
    <div className="card-content-container">
      { content.image ? (
      <div className="row">
        <img className="content-image" src={'data:image/png;base64,' + content.image} />
      </div>
      ) : (
        <h1 className="row" 
          style={{ 
            marginTop: content?.text?.length < 300 ? '30%' : 0, 
            fontSize: content?.text?.length < 150 ? '2rem' : '1.4rem' 
          }}
          >{ content?.text }</h1>
      )}
      { content.audio && 
        <MusciNoteIcon
          className="music-note-icon" 
          width="64px"
          height="64px"
          fill={theme.textColor.main} 
          onClick={ () => switchPlayOrStop() }
        />
      }
    </div>
  )
}

export default CardSideContent
