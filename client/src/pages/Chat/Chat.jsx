import React, { useEffect, useState } from 'react'
import './Chat.css'
import { useAuthContext } from '../../hooks/useAuthContext';
import Conversation from '../../components/Conversation/Conversation';
function Chat() {
    const user = localStorage.getItem('userToken')
    const [chats, setChats] = useState([])
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
                            <div key={index}>
                                <Conversation user1Id={chat.user1Id} user2Id={chat.user2Id} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="Right-side-chat">
                <h2>Chats</h2>
            </div>
        </div>
    )
}

export default Chat