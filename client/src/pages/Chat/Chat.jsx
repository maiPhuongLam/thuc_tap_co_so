import React, { useEffect, useState } from 'react'
import './Chat.css'
import { useAuthContext } from '../../hooks/useAuthContext';
import Conversation from '../../components/Conversation/Conversation';
import ChatBox from '../../components/ChatBox/ChatBox';
function Chat() {
    const user = localStorage.getItem('userToken')
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    useEffect(() => {
        const getChats = async () => {
            const response = await fetch(`http://localhost:5000/chat`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bear ${user}`
                }
            })
            const dataApi = await response.json()
            setChats(dataApi.data)
        }
        getChats()
    }, [user])
    console.log(currentChat);
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
                            <div key={index} onClick={e => setCurrentChat(chat)}>
                                <Conversation user1Id={chat.user1Id} user2Id={chat.user2Id} />
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
                    {currentChat ? (
                        <ChatBox currentChat={currentChat} />
                    ) : (
                        <span>Tap On Chat</span>
                    )}
        
                </div>
            </div>
        </div>
    )
}

export default Chat