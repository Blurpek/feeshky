import React from 'react'
import PropTypes from 'prop-types'
import './Settings.css'
import { ReactComponent as OptionsIcon } from '../../assets/icons/settings-solid.svg'

var browser = require("webextension-polyfill");

function Settings({ decks, currentDeck, onDeckChange, onReverse, themes, currentTheme, onThemeChange }) {
  const handleDeckChange = event => {
    onDeckChange(decks.find(deck => deck.name === event.target.value))
  }

  const handleThemeChange = event => {
    onThemeChange(Object.entries(themes).find(([key, theme]) => theme.name === event.target.value)[1])
  }

  return (
    <div className="settings-container">
      <select id="decks" className="list" value={currentDeck.name} onChange={handleDeckChange}>
        { decks.map(deck => (
          <option key={deck.name}>{ deck.name }</option>
        ))}
      </select>
      <button onClick={onReverse}>Reverse</button>
      <select id="themes" className="list" value={currentTheme.name} onChange={handleThemeChange}>
        { Object.entries(themes).map(([key, theme]) => (
          <option key={theme.name}>{ theme.name }</option>
        ))}
      </select>
      <OptionsIcon 
        className="icon" 
        width="28px" 
        height="28px" 
        fill={currentTheme.textColor.main} 
        onClick={ () => browser.runtime.openOptionsPage() } 
      />
    </div>
  )
}

export default Settings

Settings.propTypes = {
  decks: PropTypes.array.isRequired,
  currentDeck: PropTypes.object.isRequired, 
  onDeckChange: PropTypes.func.isRequired, 
  onReverse: PropTypes.func.isRequired, 
  themes: PropTypes.array.isRequired, 
  currentTheme: PropTypes.object.isRequired, 
  onThemeChange: PropTypes.func.isRequired
}
