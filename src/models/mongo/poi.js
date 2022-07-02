import Mongoose from "mongoose";

const { Schema } = Mongoose;

const POISchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const POI = Mongoose.model("POI", POISchema);