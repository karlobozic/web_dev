import { River } from "./river.js";

export const riverMongoStore = {
    async getAllRiver() {
      const rivers = await River.find().lean();
      return rivers;
    },
  
    async addRiver(poiId, userid, river) {
    river.poiid = poiId;
    river.userid = userid;
      const newRiver = new River(river);
      const riverObj = await newRiver.save();
      return this.getRiverById(riverObj._id);
    },

  async getRiversByPOIId(id) {
    const rivers = await River.find({ poiid: id }).lean();
    return rivers;
  },

  async getRiverById(id) {
    if (id) {
      const river = await River.findOne({ _id: id }).lean();
      return river;
    }
    return null;
  },

  async getUserRiver(id) {
    const river = await River.find({ userid: id }).lean();
    return river.length;
  },

  async deleteRiver(id) {
    try {
      await River.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllRivers() {
    await River.deleteMany({});
  },

  async updateRiver(updatedRiver) {
    const river = await River.findOne({ _id: updatedRiver._id });
    river.name = updatedRiver.name;
    river.description = updatedRiver.description;
    river.longitude = updatedRiver.longitude;
    river.latitude = updatedRiver.latitude;
    river.img = updatedRiver.img;
    await river.save();
  },
};