import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import { useAuthContext } from '../../hooks/useAuthContext';
import Conversation from '../../components/Conversation/Conversation';
import ChatBox from '../../components/ChatBox/ChatBox';
import { useChatContext } from '../../hooks/useChatContext';
import { useSocketContext } from '../../hooks/useSocketContext';
function Chat() {
    const { ws } = useSocketContext()
    const { user } = useAuthContext() 
    const [chats, setChats] = useState([])
    const { dispatch } = useChatContext()
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)

    useEffect(() => {
        if (user) {
            ws.emit('new-user-add', user.userId)
            ws.on('get-users', users => {
                console.log(users);
                setOnlineUsers(users)
            })
        }   
    }, [user])

    useEffect(() => {
        if(sendMessage) {
            ws.emit('send-message', sendMessage)
            console.log(sendMessage);
        }
    }, [sendMessage])
    
    useEffect(() => {
        ws.on("receive-message", (data) => {
            console.log(data)
            setReceiveMessage(data);
        })
    }, [receiveMessage])

    useEffect(() => {
        const getChats = async () => {
            const response = await fetch(`http://localhost:5000/chat`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bear ${user.token}`
                }
            })
            const dataApi = await response.json()
            setChats(dataApi.data)
        }
        if (user) {
            getChats()
        }
    }, [user])

    return (
        <div className='Chat'>
            {/* Left side*/}
            <div className="Left-side-chat">
                <form action="">
                    <label htmlFor="">Logo</label>
                    <input type="text" />
                </form>
                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className='Chat-list'>
                        {chats && chats.map((chat, index) => (
                            <div key={index} onClick={e => dispatch({ type: 'SET_CURRENT_CHAT', payload: chat})}>
                                <Conversation userChat={user.userId !== chat.user1Id ? chat.user1Id : chat.user2Id  } />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right side*/}
            <div className="Right-side-chat" style={{ height: '100vh'}}>
                <div style={{ display:' flex', width: 200, alignSelf: 'flex-end' }}>
                    <div>icon1</div>
                    <div>icon1</div>
                </div>
                <div>
                    <ChatBox setSendMessage={setSendMessage} receiveMessage={receiveMessage}/>
                </div>
            </div>
        </div>
    )
}

export default Chat