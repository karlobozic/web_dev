import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { riverJsonStore } from "./river-json-store.js";


const db = new Low(new JSONFile("./src/models/json/poi.json"));
db.data = { poi: [] };

export const poiJsonStore = {
  async getAllPOI() {
    await db.read();
    return db.data.poi;
  },

  async addPOI(poi) {
    await db.read();
    poi._id = v4();
    db.data.poi.push(poi);
    await db.write();
    return poi;
  },

  async getPOIById(id) {
    await db.read();
    const list = db.data.poi.find((poi) => poi._id === id);
    list.rivers = await riverJsonStore.getRiversByPOIId(list._id);
    return list;
  },

  async getUserPOI(userid) {
    await db.read();
    return db.data.poi.filter((poi) => poi.userid === userid);
  },

  async deletePOIById(id) {
    await db.read();
    const index = db.data.poi.findIndex((poi) => poi._id === id);
    db.data.poi.splice(index, 1);
    await db.write();
  },

  async deleteAllPOI() {
    db.data.poi = [];
    await db.write();
  },
};