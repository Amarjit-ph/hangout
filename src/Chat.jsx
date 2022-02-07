/*
 * Author: Amarjit Pheiroijam
 * OS : Zorin OS 16 Core
 * Editor : Visual Studio Code 1.64.0
 * Created Date: Thursday, August 26th 2021, 11:19:50 pm
 * Year 2022
 */
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [roomName, setRoomName] = useState(room);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div class="flex-1 px-5 justify-between flex flex-col h-screen bg-white">
      <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div class="flex items-center space-x-4">

          <div class="flex flex-col leading-tight">
            <div class="text-xl mt-1 flex items-center">
              <span class="text-gray-700 mr-3">{username}</span>
              <span class="text-green-500 mt-1 ml-5">
                <svg width="10" height="10">
                  <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
                </svg>
              </span>
              <p className="text-xs">ONLINE</p>
            </div>
            <span class="text-md text-gray-600">ROOM ID : {roomName}</span>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button type="button" class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
          </button>
        </div>
      </div>


      <div id="messages" class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">


        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            if (username === messageContent.author) {
              return <div class="chat-message mb-3">
                <div class="flex items-end">
                  <div class="flex flex-col text-xs max-w-xs mx-2 order-2 items-start">
                    <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{messageContent.message}</span></div>
                    <p > You at {messageContent.time}</p>
                  </div>
                  {/* <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-1" /> */}
                </div>
              </div>
            } else {
              return <div class="chat-message mb-3">
                <div class="flex items-end justify-end">
                  <div class="flex flex-col text-xs max-w-xs mx-2 order-1 items-end">
                    <div><span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">{messageContent.message}</span></div>
                    <p > {messageContent.author} at {messageContent.time}</p>
                  </div>
                  {/* <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-2" /> */}
                </div>
              </div>
            }
          })}
        </ScrollToBottom>
      </div>


      <div class="border-t-2 border-gray-200 px-1 pt-4 mb-3 sm:mb-4">
        <div class="relative flex">
          <span class="absolute inset-y-0 flex items-center">
          </span>
          <input type="text" placeholder="Message" value={currentMessage}
            class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }} />
          <div class="absolute right-0 items-center inset-y-0 sm:flex">
            <button type="button" class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              onClick={sendMessage}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 transform rotate-90">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Chat;
