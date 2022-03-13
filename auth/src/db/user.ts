import mongoose from "mongoose";

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

const UserScheam = new Schema({
  email: {
    type: String,
    required: true,
    index: 1,
  },
  password: {
    type: String,
    required: true,
  },
});

UserScheam.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModule>("User", UserScheam);

export { User };
