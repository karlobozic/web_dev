import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/river.json"));
db.data = { rivers: [] };

export const riverJsonStore = {
  async getAllRivers() {
    await db.read();
    return db.data.rivers;
  },

  async addRiver(poiId, river) {
    await db.read();
    river._id = v4();
    river.poiid = poiId;
    db.data.rivers.push(river);
    await db.write();
    return river;
  },

  async getRiversByPOIId(id) {
    await db.read();
    return db.data.rivers.filter((river) => river.poiid === id);
  },

  async getRiverById(id) {
    await db.read();
    return db.data.rivers.find((river) => river._id === id);
  },

  async deleteRiver(id) {
    await db.read();
    const index = db.data.rivers.findIndex((river) => river._id === id);
    db.data.rivers.splice(index, 1);
    await db.write();
  },

  async deleteAllRivers() {
    db.data.rivers = [];
    await db.write();
  },

  async updateRiver(river, updatedRiver) {
    river.title = updatedRiver.title;
    river.artist = updatedRiver.artist;
    river.duration = updatedRiverv.duration;
    await db.write();
  },
};