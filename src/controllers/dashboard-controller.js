import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      let test = false;
      if (loggedInUser.email == "admin@admin.ie") {
        test = true;
      }
      console.log(loggedInUser.email);
      // const poi = await db.poiStore.getUserPOI(loggedInUser._id);
      const poi = await db.poiStore.getAllPOI();
      const viewData = {
        title: "POI Placemarker Dashboard",
        user: loggedInUser,
        poi: poi,
        test: test,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPOI: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPOI = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.poiStore.addPOI(newPOI);
      return h.redirect("/dashboard");
    },
  },

  deletePOI: {
    handler: async function (request, h) {
      const poi = await db.poiStore.getPOIById(request.params.id);
      await db.poiStore.deletePOIById(poi._id);
      return h.redirect("/dashboard");
    },
  },

  map: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const river = await db.riverStore.getAllRiver();
      let test = false;
      if (loggedInUser.email == "admin@admin.ie") {
        test = true;
      }

      const viewData = {
        user: loggedInUser,
        test: test,
        river: river
      };
      return h.view("map-view", viewData);
    },
  },



};