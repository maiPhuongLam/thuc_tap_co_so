import { createContext, useReducer } from 'react'

export const ChatContext = createContext()

export const chatRecuder = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_CHAT':
      return { currentChat: action.payload }
    default:
      return state
  }
}

export const ChatConetextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatRecuder, { 
    currentChat: null
  })

  return (
    <ChatContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ChatContext.Provider>
  )

}