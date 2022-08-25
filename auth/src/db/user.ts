import mongoose from "mongoose";
import { Password } from "../services/password";

const Schema = mongoose.Schema;

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModule extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const UserScheam = new Schema(
  {
    email: {
      type: String,
      required: true,
      index: 1,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

UserScheam.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

UserScheam.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModule>("User", UserScheam);

export { User };
