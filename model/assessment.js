const { Schema, default: mongoose } = require("mongoose");

const assessmentSchema = new Schema(
  {
    assessments: {
      required: true,
      type: Array,
    },
    otherMarks: {
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

export const Assessment =
  mongoose.models.Assessment ?? mongoose.model("Assessment", assessmentSchema);
