import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    slug: {
      required: true,
      type: String,
    },
    description: {
      type: String,
    },
    actvie: {
      required: true,
      default: false,
      type: Boolean,
    },
    slug: {
      required: true,
      type: String,
    },
    course: {
      required: true,
      type: Schema.ObjectId,
    },
    duration: {
      type: Number,
    },

    lessonIds: {
      type: [Schema.ObjectId],
    },
    order: {
      required: true,
      type: Number,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const Module =
  mongoose.models.Module ?? mongoose.model("Module", moduleSchema);
