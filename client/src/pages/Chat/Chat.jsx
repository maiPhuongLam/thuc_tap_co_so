import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import { useAuthContext } from '../../hooks/useAuthContext';
import Conversation from '../../components/Conversation/Conversation';
import ChatBox from '../../components/ChatBox/ChatBox';
import { io } from 'socket.io-client'
import { useChatContext } from '../../hooks/useChatContext';
function Chat() {
    const { user } = useAuthContext() 
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const { dispatch } = useChatContext()
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()

    // useEffect(() => {
    //     if (user) {
    //         socket.current = io('http://localhost:5000')
    //         socket.current.emit('new-user-add', user.userId)
    //         socket.current.on('get-users', users => {
    //             setOnlineUsers(users)
    //         })
    //     }
    //     console.log(socket);
    // }, [user])
    // console.log(onlineUsers);

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
            
                        <ChatBox />

        
                </div>
            </div>
        </div>
    )
}

export default Chat