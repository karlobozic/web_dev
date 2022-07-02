import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, RiverSpec, RiverSpecPlus, RiverArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const RiverApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const rivers = await db.riverStore.getAllRiver();
        return rivers;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: RiverArraySpec, failAction: validationError },
    description: "Get all riverApi",
    notes: "Returns all riverApi",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const river = await db.riverStore.getRiverById(request.params.id);
        if (!river) {
          return Boom.notFound("No river with this id");
        }
        return river;
      } catch (err) {
        return Boom.serverUnavailable("No river with this id");
      }
    },
    tags: ["api"],
    description: "Find a river",
    notes: "Returns a river",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: RiverSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const river = await db.riverStore.addRiver(request.params.id, request.payload);
        if (river) {
          return h.response(track).code(201);
        }
        return Boom.badImplementation("error creating river");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a river",
    notes: "Returns the newly created river",
    validate: { payload: RiverSpec },
    response: { schema: RiverSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.riverStore.deleteAllRivers();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all riverApi",
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const river = await db.riverStore.getRiverById(request.params.id);
        if (!river) {
          return Boom.notFound("No Track with this id");
        }
        await db.riverStore.deleteRiver(river._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No river with this id");
      }
    },
    tags: ["api"],
    description: "Delete a river",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};