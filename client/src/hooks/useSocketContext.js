import { useContext } from "react"
import { SocketContext } from '../store/SocketContext'

export const useSocketContext = () => {
    const context = useContext(SocketContext)
  
    if(!context) {
      throw Error('useSocketContext must be used inside an AuthContextProvider')
    }
  
    return context
}