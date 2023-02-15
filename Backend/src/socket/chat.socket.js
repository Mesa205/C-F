import { Server } from "socket.io";

let messages = [{message:"hola mundo", hour: 1673718190301}];

export const socket = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("usuario conectado", socket.id);

    const sendMessages = () => {
      io.emit("server:getMessages", messages);
    };

    sendMessages();

    socket.on("client:addMessage", (message) => {
      messages.push(message);
      sendMessages();
    });

    socket.on("disconnect", () => {
      console.log("usuario desconectado", socket.id);
    });
  });
};
