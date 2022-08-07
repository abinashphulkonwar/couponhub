import { Server } from "socket.io";
import { createUserHandler } from "./handlers/create-user-handler";
import { chanaleTypes } from "../types/chanale-types";
import { addData, removeData } from "./data/socket-client-db";

const io = new Server({
  cors: {
    origin: ["*"],
  },
});
declare module "socket.io" {
  interface Socket {
    chanale: string;
    type: string;
  }
}

io.use((socket, next) => {
  try {
    const chanale = socket.handshake.auth.chanale;
    const type = socket.handshake.auth.type;

    socket.chanale = chanale;
    socket.type = type;
    next();
  } catch (err: any) {
    console.log(err?.message);
  }
});

io.on("connection", (socket) => {
  console.log(socket.chanale, socket.id, socket.type);
  if (socket.chanale && socket.type) {
    addData(socket.chanale, socket.id, socket.type);
  }

  if (chanaleTypes.userCreate === socket.chanale) {
    createUserHandler(socket);
  }

  socket.on("disconnect", () => {
    removeData(socket.chanale, socket.id, socket.type);
  });
});

io.listen(3005);
