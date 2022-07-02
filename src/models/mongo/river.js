import Mongoose from "mongoose";

const { Schema } = Mongoose;

const riverSchema = new Schema({
  name: String,
  description: String,
  longitude: Number,
  latitude: Number,
  img: String,
  poiid: {
    type: Schema.Types.ObjectId,
    ref: "POI",
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const River = Mongoose.model("River", riverSchema);