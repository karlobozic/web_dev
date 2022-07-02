import Joi from "joi";
export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("admin@admin.ie").required(),
    password: Joi.string().example("admin").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Test").required(),
  lastName: Joi.string().example("Example").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const RiverSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Liffey"),
    description: Joi.string().required().example("River in Dublin"),
    longitude: Joi.number().allow("").optional().example(12),
    latitude: Joi.number().allow("").optional().example(12),
    playlistid: IdSpec,
  })
  .label("River");

export const RiverSpecPlus = RiverSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("RiverPlus");

export const RiverArraySpec = Joi.array().items(RiverSpecPlus).label("RiverArray");

export const POISpec = Joi.object()
.keys({
  title: Joi.string().required().example("Up"),
  userid: IdSpec,
})
.label("POI");

export const POISpecPlus = POISpec.keys({
_id: IdSpec,
__v: Joi.number(),
}).label("POIPlus");

export const POIArraySpec = Joi.array().items(POISpecPlus).label("POIArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");