/*eslint-disable */
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  ConversationList,
  Conversation,
  Avatar,
  Search,
} from '@chatscope/chat-ui-kit-react'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import ChatComp from './ChatComp'
import { io } from 'socket.io-client'
const socket = io.connect('http://localhost:3001')
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

function Chat() {
  const [data, setData] = useState()
  const [currentUser, setCurrentUser] = useState()
  const [currentMessage, setCurrentMessage] = useState()
  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/dashboard/chat/users')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    socket.on('recieve_message', (data) => {
      setMessageList((list) => [...list, data])
    })
  }, [socket])

  socket.emit('join_room', currentUser)

  const handleMessage = async (e) => {
    e.preventDefault()
    const decoded = jwt_decode(Cookies.get('token'))
    if (currentMessage !== '') {
      const messageData = {
        room: currentUser,
        username: decoded.username,
        currentMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      }
      await socket.emit('send_message', messageData)
      setMessageList((list) => [...list, messageData])
    } else {
      console.log('enter your message first..!!!')
    }
  }

  console.log(currentUser)
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <MainContainer>
        <Sidebar position="left" scrollable={false}>
          <ConversationList>
            {data?.map((user, index) => {
              return (
                <Conversation
                  name={user.username}
                  info={user.email}
                  key={index}
                  onClick={() => {
                    setCurrentUser(user.username)
                  }}
                />
              )
            })}
          </ConversationList>
        </Sidebar>
        <ChatContainer>
          <MessageList>
            {messageList?.map((data) => {
              return (
                <Message
                  model={{
                    message: data.currentMessage,
                    sentTime: data.time,
                    sender: data.username,
                  }}
                />
              )
            })}
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: 'just now',
                sender: 'Joe',
              }}
            />
          </MessageList>
          <Search placeholder="Search..." />
          <MessageInput attachButton={false} id="message" placeholder="Type message here" />
        </ChatContainer>
      </MainContainer>
      <input
        id="message"
        type="text"
        placeholder="send message"
        onChange={(e) => {
          e.preventDefault()
          setCurrentMessage(e.target.value)
        }}
      />
      <button onClick={handleMessage}>Send</button>
    </div>
  )
}
export default Chat
