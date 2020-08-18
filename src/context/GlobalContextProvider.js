import React from "react"

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const initialState = {}
initialState.popupClosed = false
initialState.itemWidth = window.innerWidth / 2
initialState.itemHeight = window.innerHeight - 115 // header 높이 빼기
initialState.imgSize = (initialState.itemHeight >= initialState.itemWidth ? initialState.itemWidth : initialState.itemHeight) * 0.88

function reducer (state, action) {
  switch (action.type) {
    case "CLOSE_POPUP": {
      return {
        ...state,
        popupClosed: true
      }
    }
    default:
      throw new Error("Bad Action Type")
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider