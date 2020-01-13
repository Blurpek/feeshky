import React from 'react'

export const themes = {
  classic: {
    backgroundColor: {
      main: '#fffe',
      light: '#ffffff',
      dark: '#eeeeee',
      contrastColor: ''
    },
    textColor: {
      main: '#333'
    },
    primaryColor: '#87ceeb',
    secondaryColor: '#90EE90'
  }
}

export const ThemeContext = React.createContext(themes.classic)