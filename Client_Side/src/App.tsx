import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message,setMessage] = useState("");
  const [latestMessage, setLatestMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      console.log('Connection established');
      setSocket(socket);
    }
    socket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setLatestMessage(message.data);
    }
    setSocket(socket);
    
    return  ()=> {
      socket?.close();
    }
  }, [])

  if(!socket){
    return <div>
      Connecting to the server...
    </div>
  }

  return (
    <>
    {/* send whatever in the input message from the clent and the server respond the same */}
      <input onChange={(e)=>{
        setMessage(e.target.value)
      }} />
      <button onClick={()=>{
        socket.send(message);
      }}>send</button>
      {latestMessage}
    </>
  )
}

export default App