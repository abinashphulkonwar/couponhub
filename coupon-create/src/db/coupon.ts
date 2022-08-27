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
  type?: string;
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
  type?: string;
  coupon: string;
  isUsed: false;
  userId: string;
}

const CouponScheam = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      index: true,
      required: true,
    },
    type: {
      type: String,
      index: true,
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
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

CouponScheam.index({
  createAted: 1,
});

CouponScheam.statics.build = (attrs: CouponAttrs) => {
  return new Coupon(attrs);
};
CouponScheam.pre("save", function (next) {
  if (this.__v >= 0) {
    this.__v = this.__v + 1;
  }

  next();
});

const Coupon = mongoose.model<UserDoc, UserModule>("Coupon", CouponScheam);

export { Coupon };
