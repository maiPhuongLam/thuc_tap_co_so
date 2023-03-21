import { createContext } from "react";
import socketIOClient from 'socket.io-client'
const WS = 'http://localhost:5000'

const MessageContext = createContext(null)
const ws = socketIOClient(WS)

export const MessageProvider = ({ children }) => {
    return (
        <MessageContext.Provider value={{ ws }}>
            {children}
        </MessageContext.Provider>

    )
}