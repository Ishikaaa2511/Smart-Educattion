import {useEffect, useRef, useState} from 'react'
import Message from './Message';
import { db } from '../../firebase.config';
const ChatBox = () => {
  
  const messages =[
    {
      id:1,
      text: "Hello there!",
      name: "Deep"
    }, 
    {
      id:2,
      text: "Hii !",
      name: "Ishika"
    }

  ]

  return (
    <div className="pb-44 pt-20 containerWrap">
    {messages.map(message => (
      <Message key={message.id} message={message} />
    ))}
  
  </div>
  )
}

export default ChatBox
