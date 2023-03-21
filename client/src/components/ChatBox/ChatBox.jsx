import React, { useEffect, useState } from 'react'
import './ChatBox.css'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'

function ChatBox({ currentChat }) {
    const user = localStorage.getItem('userToken')
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    console.log(currentChat);
    console.log(messages);
    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch(`http://localhost:5000/message/${currentChat.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bear ${user}`
                }
            })
            const dataApi = await response.json()
            if (dataApi.status === 'no data') {
                console.log(dataApi.msg);
                return
            }
            setMessages(dataApi.data)
        }
        fetchMessages()
    }, [currentChat])

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    return (
        <>
            <div className='ChatBox-container'>
                <>
                    <div className='chat-header'>
                        <div className="follower" style={{ paddingBottom: 8 }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ display: 'flex', borderRadius: '50%', overflow: 'hidden' }}>
                                    <div className="online-dot"></div>
                                    <img src={currentChat.user2.profilePicture} alt="" className='followerImage' style={{ width: '50px', height: '50px' }}/>
                                </div>
                                <div className='name' style={{ fontSize: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <span>{currentChat.user2?.firstname} {currentChat.user2?.lastname}</span>
                                    <span>online</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    
                    {/* message */}
                    <div className="chat-body">
                        {messages && messages.map((message, index) => (
                            <div key={index} className={message.senderId === currentChat.user1.id ? "message own" : "message"}>
                                <div style={{ display: 'flex', flexDirection: 'column'}}>
                                    <span style={{ fontSize: '15px', fontWeight: 500 }}>{message.text}</span>
                                    <span style={{ fontSize: '10px', opacity: 0.7}}>{format(message.createdDate)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="chat-sender">
                        <div>+</div>
                        <InputEmoji 
                            value={newMessage}
                            onChange={handleChange}
                        />
                        <button>Send</button>
                    </div>
                </>
            </div>
        </>
    )
}

export default ChatBox