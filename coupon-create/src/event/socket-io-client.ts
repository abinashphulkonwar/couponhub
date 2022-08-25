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
        if (!data.body?.id || !data.body?.email) return;
        const userdb = User.build({
          id: data.body.id,
          email: data.body.email,
        });
        console.log(userdb);
        await userdb.save();

        socket.emit("create user publisher ack", { _id: data!._id });
      } catch (err: any) {
        console.log(err.message);
      }
    }
  );
};

export { createUserListner };
