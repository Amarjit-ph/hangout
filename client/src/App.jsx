/*
 * Author: Amarjit Pheiroijam
 * OS : Zorin OS 16 Core
 * Editor : Visual Studio Code 1.64.0
 * Created Date: Thursday, August 26th 2021, 11:19:50 pm
 * Year 2022
 */
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App bg-blue-200">
      {!showChat ? <Login setUsername={setUsername} setRoom={setRoom} joinRoom={joinRoom} />
        : (
          <Chat socket={socket} username={username} room={room} />
        )}
    </div>
  );
}

export default App;

const Login = ({ setUsername, setRoom, joinRoom }) => {
  return (
    <div class="flex items-center justify-center h-screen" >
      <div class="bg-white rounded-2xl border shadow-xl p-10 h-screen w-screen sm:h-screen md:h-96 md:max-w-md">
        <div class="flex flex-col items-center space-y-3">
          <h1 class="font-bold text-3xl text-gray-700 w-4/6 text-center">Hangout</h1>
          <p class="text-sm text-gray-500 text-center w-5/6">Our chat community gives you the opportunity of making new friends and sharing good moments with other people.</p>
          <p class="text-sm text-gray-500 text-center  w-5/6 md:hidden">Design & Developed <br /><span className="font-semibold">Amarjit Pheiroijam</span></p>
          <input type="text" placeholder="Name" class="border-2 rounded-lg w-full h-12 px-4"
            onChange={(event) => {
              setUsername(event.target.value);
            }} />
          <input type="text" placeholder="Room ID" class="border-2 rounded-lg w-full h-12 px-4"
            onChange={(event) => {
              setRoom(event.target.value);
            }} />
          <button class="bg-blue-600 text-white rounded-md font-semibold px-4 py-3 w-full" onClick={joinRoom}>Join</button>
        </div>
      </div>
    </div>
  );
}