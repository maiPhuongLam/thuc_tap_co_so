import React, { useEffect, useState } from 'react'

function Conversation({ user1Id, user2Id }) {
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        const getUserData = async () => {
            const response = await fetch(`http://localhost:5000/user/${user2Id}`)
            const dataApi = await response.json()
            setUserData(dataApi.data)
            console.log(dataApi);
        }
        getUserData()
    }, [])

    return (
        <div>Conversation</div>
    )
}

export default Conversation