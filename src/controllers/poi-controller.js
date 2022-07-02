import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";
import { RiverSpec } from "../models/joi-schemas.js";

export const poiController = {
  index: {
    handler: async function (request, h) {
      const poi = await db.poiStore.getPOIById(request.params.id);
      const loggedInUser = request.auth.credentials;
      let test = false;
      if (loggedInUser.email == "admin@admin.ie") {
        test = true;
      }
      const viewData = {
        title: "POI",
        user: loggedInUser,
        poi: poi,
        test: test,

      };
      return h.view("poi-view", viewData);
    },
  },

  addRiver: {
    validate: {
      payload: RiverSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("poi-view", { title: "Add river error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const poi = await db.poiStore.getPOIById(request.params.id);
      const loggedInUser = request.auth.credentials;
      const newRiver = {
        name: request.payload.name,
        description: request.payload.description,
        longitude: Number(request.payload.longitude),
        latitude: Number(request.payload.latitude),
      };
      await db.riverStore.addRiver(poi._id, loggedInUser, newRiver);
      return h.redirect(`/poi/${poi._id}`);
    },
  },

  deleteRiver: {
    handler: async function(request, h) {
      const poi = await db.poiStore.getPOIById(request.params.id);
      await db.riverStore.deleteRiver(request.params.riverid);
      return h.redirect(`/poi/${poi._id}`);
    },
  },

  uploadImage: {
    handler: async function(request, h) {
      const poi = await db.poiStore.getPOIById(request.params.id);
      try {
        const river = await db.riverStore.getRiverById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          river.img = url;
          db.riverStore.updateRiver(river);
        }
        return h.view("poi-view");
      } catch (err) {
        console.log(err);
        return h.view("poi-view");
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  }
};