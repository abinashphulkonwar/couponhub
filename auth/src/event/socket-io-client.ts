import { io } from "socket.io-client";
import { chanaleTypes } from "../../../types/chanale-types";
import UserCreateDataInterface from "../../../types/event-types/create-user-event-data-type";

const socket = io("http://localhost:3005", {
  auth: {
    chanale: chanaleTypes.userCreate,
  },
});

export const sendEvent = async (data: UserCreateDataInterface) => {
  try {
    socket.emit("create user publisher", data);
  } catch (err: any) {
    console.log(err.message);
  }
};

sendEvent({
  id: "sbdskb sdn msdsd",
  createAted: "dsiusdinsd",
  __v: 0,
  email: "test@gmail.com",
});
