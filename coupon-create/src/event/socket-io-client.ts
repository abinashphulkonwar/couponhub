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
  console.log(data);
});
