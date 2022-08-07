import { Server } from "socket.io";
import { createUserHandler } from "./handlers/create-user-handler";
import { chanaleTypes } from "../types/chanale-types";
import { addData } from "./data/socket-client-db";

const io = new Server({
  cors: {
    origin: ["*"],
  },
});
declare module "socket.io" {
  interface Socket {
    chanale: string;
  }
}

io.use((socket, next) => {
  try {
    const chanale = socket.handshake.auth.chanale;

    socket.chanale = chanale;
    next();
  } catch (err: any) {
    console.log(err?.message);
  }
});

io.on("connection", (socket) => {
  console.log(socket.chanale, socket.id);
  if (socket.chanale) {
    addData(socket.chanale, socket.id);
  }

  if (chanaleTypes.userCreate === socket.chanale) {
    createUserHandler(socket);
  }
});

io.listen(3005);
