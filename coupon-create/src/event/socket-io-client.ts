import { io } from "socket.io-client";
import { chanaleTypes, listerType } from "../../../types/chanale-types";
import UserCreateDataInterface from "../../../types/event-types/create-user-event-data-type";
import { User } from "../db/user";

const socket = io("http://localhost:3005", {
  auth: {
    chanale: chanaleTypes.userCreate,
    type: listerType,
  },
});

const createUserListner = () => {
  return socket.on(
    "create user lister",
    async (data: UserCreateDataInterface) => {
      try {
        if (!data.body?.id || !data.body?.email || data.body.__v >= 0) return;
        const userdb = User.build({
          id: data.body.id,
          email: data.body.email,
          __v: data.body.__v,
        });
        console.log(userdb);
        await userdb.save();

        socket.emit("create user publisher ack", { id: data!.id });
      } catch (err: any) {
        console.log(err.message);
      }
    }
  );
};

export { createUserListner };
