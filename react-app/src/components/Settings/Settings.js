import React from 'react'
import PropTypes from 'prop-types'
import './Settings.css'

const styles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  height: '40px',
  width: '100%'
}

function Settings({ decks, currentDeck, onDeckChange, onReverse, themes, currentTheme, onThemeChange }) {
  const handleDeckChange = event => {
    onDeckChange(decks.find(deck => deck.name === event.target.value))
  }

  const handleThemeChange = event => {
    onThemeChange(Object.entries(themes).find(([key, theme]) => theme.name === event.target.value)[1])
  }
  
  return (
    <div style={styles}>
      {/* <input list="decks" placeholder="Choose deck" className="input" /> */}
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
    </div>
  )
}

export default Settings

Settings.propTypes = {
  decks: PropTypes.array.isRequired
}
