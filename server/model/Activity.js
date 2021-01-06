const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema(
  {
    actType: {
      type: String,
      enum: ["Correction", "Detection"],
    },
    content: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Activity", ActivitySchema);
