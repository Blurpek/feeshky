import React from 'react'

export const themes = {
  classic: {
    name: 'Classic',
    backgroundColor: {
      main: '#fffeee',
      light: '#ffffff',
      dark: '#eeeeee',
      contrastColor: ''
    },
    textColor: {
      main: '#333'
    },
    primaryColor: '#87ceeb',
    secondaryColor: '#90EE90',
    shadow: 'grey'
  },
  orangeTeal: {
    name: 'Orange & Teal',
    backgroundColor: {
      main: '#fffe',
      light: '#ffffff',
      dark: '#eeeeee',
      contrastColor: ''
    },
    textColor: {
      main: '#333'
    },
    primaryColor: '#12908E',
    secondaryColor: '#F98F45',
    shadow: 'grey'
  },
  dark: {
    name: 'Dark',
    backgroundColor: {
      main: '#333333',
      light: '#333444',
      dark: '#444444'
    },
    textColor: {
      main: '#fffeee'
    },
    primaryColor: '#87ceeb',
    secondaryColor: '#90EE90',
    shadow: 'grey'
  },
  darkOrangeTeal: {
    name: 'Dark O&T',
    backgroundColor: {
      main: '#333333',
      light: '#333444',
      dark: '#444444'
    },
    textColor: {
      main: '#fffeee'
    },
    primaryColor: '#12908E',
    secondaryColor: '#F98F45',
    shadow: 'grey'
  }
}

export const ThemeContext = React.createContext(themes.classic)