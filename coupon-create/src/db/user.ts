import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface UserAttrs {
  id: string;
  email: string;
}

interface UserModule extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  id: string;
  email: string;
}

const UserScheam = new Schema(
  {
    email: {
      type: String,
      required: true,
      index: 1,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

UserScheam.statics.build = (attrs: UserAttrs) => {
  return new User({
    _id: attrs.id,
    email: attrs.email,
  });
};

const User = mongoose.model<UserDoc, UserModule>("User", UserScheam);

export { User };
