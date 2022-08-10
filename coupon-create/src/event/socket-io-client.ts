import { io } from "socket.io-client";
import { chanaleTypes, listerType } from "../../../types/chanale-types";
import UserCreateDataInterface from "../../../types/event-types/create-user-event-data-type";

const socket = io("http://localhost:3005", {
  auth: {
    chanale: chanaleTypes.userCreate,
    type: listerType,
  },
});

socket.on("create user lister", (data: UserCreateDataInterface) => {
  try {
    socket.emit("create user publisher ack", { _id: data!._id });
  } catch (err: any) {
    console.log(err.message);
  }
});
