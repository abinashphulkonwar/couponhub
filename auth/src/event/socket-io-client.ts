import { io } from "socket.io-client";
import { chanaleTypes, publisherType } from "../../../types/chanale-types";
import UserCreateDataInterface from "../../../types/event-types/create-user-event-data-type";
import { Types } from "mongoose";

const socket = io("http://localhost:3005", {
  auth: {
    chanale: chanaleTypes.userCreate,
    type: publisherType,
  },
});

export const sendUserCrateEvent = async (data: UserCreateDataInterface) => {
  try {
    socket.emit("create user publisher", data);
  } catch (err: any) {
    console.log(err.message);
  }
};
