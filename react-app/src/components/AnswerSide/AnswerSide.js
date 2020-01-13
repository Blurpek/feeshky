import React, { useContext } from 'react'
import CardSideContent from '../CardSideContent/CardSideContent';
import { ThemeContext } from '../../ThemeContext';
import './AnswerSide.css'


const answerSideStyles = (theme, isReversed) => ({
  height: '100%',
  width: '49%',
  color: theme?.textColor.main,
  backgroundColor: isReversed ? theme?.backgroundColor.main : theme?.backgroundColor.dark,
  border: '14px solid ' + theme?.secondaryColor,
  borderRadius: '15px 15px 15px 15px',
  borderLeftWidth: isReversed ? '14px' : 0,
  cursor: 'pointer',
  boxShadow: !isReversed ? '0 0' : '0 0 10px 10px grey',
  // boxShadow: !isReversed ? '0 0' : '-10px 10px 10px grey',
  transition: 'ease-out .2s',
  zIndex: isReversed ? 1 : 0
})


function AnswerSide({ answer, onClick, isReversed }) {
  const theme = useContext(ThemeContext)
  const styles = answerSideStyles(theme, isReversed)

  const reverseMeButton = <p className="reverse unselectable">?</p>

  return (
    <div style={styles} onClick={onClick}>
      { !isReversed ? reverseMeButton : <CardSideContent content={answer} /> }
    </div>
  )
}

export default AnswerSide
