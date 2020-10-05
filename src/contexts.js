import React from 'react';

export const MenuContext = React.createContext(['Home', (menuTitle) => {}])

export const ThemeContext = React.createContext(['dark', (theme) => {}])

export const ThemeProvider = ThemeContext.Provider

export const MenuProvider = MenuContext.Provider
