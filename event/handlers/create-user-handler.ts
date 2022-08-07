import { Socket } from "socket.io";
import { Event } from "../db/event";
import { chanaleTypes } from "../../types/chanale-types";
import UserCreateDataInterface from "../../types/event-types/create-user-event-data-type";

export const createUserHandler = (socket: Socket) => {
  socket.on("create user publisher", async (data: UserCreateDataInterface) => {
    const eventdb = new Event({ chanle: chanaleTypes.userCreate, body: data });

    console.log(eventdb);
    // await eventdb.save();
    socket.emit("create user lister", eventdb);
  });
};
