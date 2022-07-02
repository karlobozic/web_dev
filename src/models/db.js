// import { userMemStore } from "./mem/user-mem-store.js";
// import { playlistMemStore } from "./mem/playlist-mem-store.js";
// import { trackMemStore } from "./mem/track-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { poiJsonStore } from "./json/poi-json-store.js";
import { riverJsonStore } from "./json/river-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { poiMongoStore } from "./mongo/poi-mongo-store.js";
import { riverMongoStore } from "./mongo/river-mongo-store.js";

export const db = {
  userStore: null,
  poiStore: null,
  riverStore: null,


//   init() {
//     this.userStore = userJsonStore;
//     this.poiStore = poiJsonStore;
//     this.riverStore = riverJsonStore;
//   },
// };

init(storeType) {
  switch (storeType) {
    case "json":
      this.userStore = userJsonStore;
      this.poiStore = poiJsonStore;
      this.riverStore = riverJsonStore;
      break;
    case "mongo":
      this.userStore = userMongoStore;
      this.poiStore = poiMongoStore;
      this.riverStore = riverMongoStore;
      connectMongo();
      break;
    default:
      this.userStore = userMemStore;
      this.poiStore = playlistMemStore;
      this.trackStore = trackMemStore;
  }
},
};