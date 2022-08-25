import { Socket } from "socket.io";
import { Event } from "../db/event";
import { chanaleTypes } from "../../types/chanale-types";
import UserCreateDataInterface from "../../types/event-types/create-user-event-data-type";
import { getData } from "../data/socket-client-db";
import {
  listerType,
  createUserPublisher,
  createUserPublisherAck,
  createUserListner,
} from "../../types/chanale-types";

let index: number = 0;

export const createUserHandler = (socket: Socket) => {
  socket.on(createUserPublisher, async (data: UserCreateDataInterface) => {
    try {
      const socketIds = getData(chanaleTypes.userCreate, listerType);
      console.log(socketIds);
      const eventdb = new Event({
        chanle: chanaleTypes.userCreate,
        body: data,
      });

      if (socketIds?.length) {
        if (socketIds.length > index + 1) {
          index++;
        } else if (socketIds.length == index) {
          index = 0;
        } else {
          index = 0;
        }
      }

      await eventdb.save();
      console.log(eventdb);
      if (!socketIds?.length) return;
      socket.to(socketIds[index]).emit(createUserListner, {
        id: eventdb._id,
        body: eventdb.body,
      });
    } catch (err: any) {
      console.log(err?.message);
    }
  });

  socket.on(createUserPublisherAck, async (data: { id: string }) => {
    try {
      await Event.findByIdAndDelete(data?.id);
    } catch (err: any) {
      console.log(err?.message);
    }
  });
};
