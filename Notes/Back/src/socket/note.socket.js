import { Server } from "socket.io";
import { noteModel } from "../models/note.model.js";

export const socket = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log(`usuario conectado ${socket.id}`);

    const getNotes = async () => {
      const notes = await noteModel.find();
      socket.emit("server: getNotes", notes);
    };
    getNotes();

    socket.on("client:addNote", async (note) => {
      await noteModel.create(note);
    });

    socket.on("client: updateNote", async (note) => {
      await noteModel.findByIdAndUpdate({ _id: note._id }, note);
      getNotes();
    });

    socket.on("client:deleteNote", async (id) => {
      await noteModel.findByIdAndUpdate(id);
      getNotes();
    });
    socket.on("client:getnotes", async (id) => {
      const notes = await noteModel.find(id);
      io.emit("server:getNote", notes);
    });
    socket.on("disconnect", async () => {
      console.log(`usuario desconectado ${socket.id}`);
    });
  });
};
