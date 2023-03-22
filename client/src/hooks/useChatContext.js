import { useContext } from "react"
import { ChatContext } from '../store/ChatContext'

export const useChatContext = () => {
    const context = useContext(ChatContext)
  
    if(!context) {
      throw Error('useChatContext must be used inside an AuthContextProvider')
    }
  
    return context
}