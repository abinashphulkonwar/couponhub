import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface blocks {
  type: string;
  data: [{ type: string; data: string }];
}

interface CouponAttrs {
  userId: string;
  title: string;
  image: string;
  video: string;
  des: blocks[];
  coupon: string;

  isUsed: boolean;
}

interface UserModule extends mongoose.Model<UserDoc> {
  build(attrs: CouponAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  image: string;
  title: string;
  video: string;
  des: blocks[];
  coupon: string;
  isUsed: false;
  userId: string;
}

const CouponScheam = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,

      required: true,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    des: {
      type: Array,
      required: true,
    },
    coupon: {
      type: String,
      required: true,
    },
    isUsed: {
      type: Boolean,
      required: true,
      default: false,
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

CouponScheam.statics.build = (attrs: CouponAttrs) => {
  return new Coupon(attrs);
};

const Coupon = mongoose.model<UserDoc, UserModule>("Coupon", CouponScheam);

export { Coupon };
