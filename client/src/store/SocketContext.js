import { createContext, useReducer } from 'react'
import socketIOClient from 'socket.io-client'

const WS = 'http://localhost:5000'
const ws = socketIOClient(WS)
export const SocketContext = createContext()

export const socketReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WS':
      return { ws: action.payload }
    default:
      return state
  }
}

export const SocketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(socketReducer, { ws })

  return (
    <SocketContext.Provider value={{ ...state, dispatch }}>
      { children }
    </SocketContext.Provider>
  )

}