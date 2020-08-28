import React, { useEffect } from 'react'

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

function reducer (state, action) {
  switch (action.type) {
    case 'POPUP_VISIBLE': {
      return {
        ...state,
        popupVisible: action.value,
      }
    }
    case 'ITEM_WIDTH': {
      return {
        ...state,
        itemWidth: action.value,
      }
    }
    case 'ITEM_HEIGHT': {
      return {
        ...state,
        itemHeight: action.value,
      }
    }
    case 'IMG_SIZE': {
      return {
        ...state,
        imgSize: action.value,
      }
    }
    default:
      throw new Error('Bad Action Type')
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, {})

  useEffect(() => {
    const itemWidth = window.innerWidth / 2
    const itemHeight = window.innerHeight - 115 // header 높이 빼기
    const imgSize = (itemHeight >= itemWidth ? itemWidth : itemHeight) * 0.88  
    dispatch({type: 'POPUP_VISIBLE', value: true })
    dispatch({type: 'ITEM_WIDTH', value: itemWidth })
    dispatch({type: 'ITEM_HEIGHT', value: itemHeight })
    dispatch({type: 'IMG_SIZE', value: imgSize })
  }, [])

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider
