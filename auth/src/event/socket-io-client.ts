import { io } from "socket.io-client";
import {
  chanaleTypes,
  publisherType,
  createUserPublisher,
} from "../../../types/chanale-types";
import UserCreateDataInterface from "../../../types/event-types/create-user-event-data-type";

const socket = io("http://localhost:3005", {
  auth: {
    chanale: chanaleTypes.userCreate,
    type: publisherType,
  },
});

export const sendUserCrateEvent = async (data: UserCreateDataInterface) => {
  try {
    socket.emit(createUserPublisher, data);
  } catch (err: any) {
    console.log(err.message);
  }
};
