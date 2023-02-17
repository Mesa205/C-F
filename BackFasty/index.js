import Fastify from "fastify";
import { Socket } from "socket.io";
import { socket } from "./src/chat.socket.js";


const fastify = Fastify({
  logger: true,
});

fastify.register(socket)
// fastify.register(Socket);

const start = async () => {
    try {
      await fastify.listen({  port: 4000, host: "0.0.0.0"})
      console.log("Servidor escuchando por el puerto 4000");

      socket(fastify)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()


