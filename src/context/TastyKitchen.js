import React from 'react'

const TastyKitchen = React.createContext({
  changeTabId: () => {},
  activeTabId: 'HOME',
})

export default TastyKitchen
