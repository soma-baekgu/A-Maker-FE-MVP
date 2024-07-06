"use client"
import { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [chatRoomId, setChatRoomId] = useState(2);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const socket = new WebSocket('ws://localhost:8080/ws');
    const client = Stomp.over(socket);

    const headers = {
      Authorization: `Bearer ${token}`
    };

    client.connect(headers, () => {
      client.subscribe(`/sub/chat-rooms/${chatRoomId}/general`, (message) => {
        setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body).content]);
      });
      setStompClient(client);  // Set the stompClient in the state
    }, (error) => {
      console.error('STOMP error', error);
    });

    return () => {
      if (client) {
        client.disconnect(() => {
          console.log('Disconnected');
        });
      }
    };
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (stompClient && inputValue.trim()) {
      const message = {
        userId: '9a933c45-6ece-4fad-b583-aac348fe1944',
        content: inputValue,
      }
      console.log(JSON.stringify(message));
      stompClient.send(`/pub/chat-rooms/${chatRoomId}/general`, {}, JSON.stringify(message));
      setInputValue("")
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div className="flex" style={{display: "flex"}}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message"
        />
      </div>

      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
