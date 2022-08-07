import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface EventAttrs {
  chanle: string;
  body: any;
}

interface EventModule extends mongoose.Model<EventDoc> {
  build(attrs: EventAttrs): EventDoc;
}

interface EventDoc extends mongoose.Document {
  chanle: string;
  body: any;
}

const EventScheam = new Schema(
  {
    chanle: {
      type: String,
      required: true,
    },
    body: {
      type: Map,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.__v;
        ret.id = ret._id;

        ret.createdAt;
        ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Event = mongoose.model<EventDoc, EventModule>("Event", EventScheam);

export { Event };
