import React, { useContext } from 'react'
import CardSideContent from '../CardSideContent/CardSideContent';
import { ThemeContext } from '../../ThemeContext';

const promptSideStyles = (theme, isReversed) => ({
  height: '100%',
  width: '49%',
  color: theme.textColor.main,
  backgroundColor: isReversed ? theme.backgroundColor.dark : theme.backgroundColor.main,
  border: '14px solid ' + theme.primaryColor,
  borderRadius: '15px 15px 15px 15px',
  borderRightWidth: isReversed ? 0 : '14px',
  boxShadow: isReversed ? '0 0' : '0 0 10px 10px ' + theme.shadow,
  transition: 'ease-out .2s',
  zIndex: isReversed ? 0 : 1
})

function PromptSide({ prompt, isReversed }) {
  const theme = useContext(ThemeContext)
  const styles = promptSideStyles(theme, isReversed)
  
  return (
    <div style={styles}>
      <CardSideContent content={prompt} />
    </div>
  )
}

export default PromptSide
