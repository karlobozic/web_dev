import Boom from "@hapi/boom";
import { IdSpec, POIArraySpec, POISpec, POISpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const poiApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const pois = await db.poiStore.getAllPOI();
        return pois;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: POIArraySpec, failAction: validationError },
    description: "Get all pois",
    notes: "Returns all pois",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const poi = await db.poiStore.getPOIById(request.params.id);
        if (!poi) {
          return Boom.notFound("No poi with this id");
        }
        return poi;
      } catch (err) {
        return Boom.serverUnavailable("No poi with this id");
      }
    },
    tags: ["api"],
    description: "Find a poi",
    notes: "Returns a poi",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: POISpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const poi = request.payload;
        const newPOI = await db.poiStore.addPOI(poi);
        if (newPOI) {
          return h.response(newPlaylist).code(201);
        }
        return Boom.badImplementation("error creating poi");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a poi",
    notes: "Returns the newly created poi",
    validate: { payload: POISpec, failAction: validationError },
    response: { schema: POISpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },  
    handler: async function (request, h) {
      try {
        const poi = await db.poiStore.getPOIById(request.params.id);
        if (!poi) {
          return Boom.notFound("No poi with this id");
        }
        await db.poiStore.deletePOIById(poi._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No poi with this id");
      }
    },
    tags: ["api"],
    description: "Delete a poi",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.poiStore.deleteAllPOIs();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all POIApi",
  },
};