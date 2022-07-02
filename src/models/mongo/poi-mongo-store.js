import { POI } from "./poi.js";
import { riverMongoStore } from "./river-mongo-store.js";

export const poiMongoStore = {
  async getAllPOI() {
    const poi = await POI.find().lean();
    return poi;
  },

  async getPOIById(id) {
    if (id) {
      const poi = await POI.findOne({ _id: id }).lean();
      if (poi) {
        poi.rivers = await riverMongoStore.getRiversByPOIId(poi._id);
      }
      return poi;
    }
    return null;
  },

  async addPOI(poi) {
    const newPOI = new POI(poi);
    const poiObj = await newPOI.save();
    return this.getPOIById(poiObj._id);
  },

  async getUserPOI(id) {
    const poi = await POI.find({ userid: id }).lean();
    return poi;
  },

  async deletePOIById(id) {
    try {
      await POI.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPOIs() {
    await POI.deleteMany({});
  }
};