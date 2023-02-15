import moment from "moment/moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useSocket } from "./Hooks/useSocket";

let socket;

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const inputRed=useRef()
  // const {socket} = useSocket("http://localhost:4000")
  const {socket}=useSocket("http://localhost:4000")

  //CONNECT BACK
  useEffect(() => {
 
    getMessage();
  }, []);

  const getMessage = useCallback(()=>{
        socket.on("server:getMessages", (messages) => {
      setMessages(messages);
    });
  }, []);

  

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("client:addMessage", {message, hour: Date.now()});
    setMessage("");
    inputRed.current.focus();
  };

  return (
    <div className="container mt-5">
      <div className="col-6">
        <form onSubmit={sendMessage}>
          <div className="mb-3">
            <input
            ref={inputRed}
              type="text"
              className="form-control"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoFocus
            />
          </div>
          <button className="btn btn primary mb-3 " type="submit">
            Enviar hijxdeputx
          </button>
        </form>
      </div>
      <div className="col-12">
        <ul className="list-group">
          {messages.map((item, i) => (
            <li key={i} className="list-group-item">
              <div className="fw-bold">{item.message}</div>
              {moment(item.hour).format('MMMM Do YYYY,HH:mm:ss')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
