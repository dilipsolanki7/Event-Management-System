const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { addEvent,updateEvent } = require("../../../../services/event/event");
const { decodeJwtTokenFn } = require("../../../../utilities/universal"); // Import the decode function
const router = new Router();

/**
 * @swagger
 * /api/v1/event/add:
 *  post:
 *   tags: ["Event"]
 *   summary: Save Event information.
 *   description: API used for saving event information.
 *   parameters:
 *      - in: body
 *        name: event
 *        description: Save event information.
 *        schema:
 *         type: object
 *         properties:
 *           title:
 *             type: string
 *           organizer:
 *             type: string
 *           date:
 *             type: string
 *             format: date
 *           time:
 *             type: string
 *           description:
 *             type: string
 *           venue:
 *             type: string
 *           photoURL:
 *             type: string
 *           createdBy:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 *   security:
 *      - bearerAuth: []
 */

const eventSchema = Joi.object({
  title: Joi.string().required().label("title"),
  organizer: Joi.string().required().label("organizer"),
  date: Joi.date().required().label("date"),
  time: Joi.string().required().label("time"),
  description: Joi.string().required().label("description"),
  venue: Joi.string().required().label("venue"),
  photoURL: Joi.string()
    .uri()
    .default("https://res.cloudinary.com/dcnssac5e/image/upload/v1720610106/samples/cup-on-a-table.jpg")
    .label("photoURL"),
  registrationFee: Joi.number().min(0).required().label("registrationFee"), // Ensures it's a non-negative number
  maxSlots: Joi.number().integer().min(1).required().label("maxSlots"), // Ensures it's a positive integer
  createdBy: Joi.string().required().label("createdBy") // Ensures the event has a creator
});



router.post(
  "/add",
  decodeJwtTokenFn,
  commonResolver.bind({
    modelService: addEvent,
    isRequestValidateRequired: false,
    schemaValidate: eventSchema,
  })
);

router.put(
  "/:id",
  decodeJwtTokenFn,
  commonResolver.bind({
    modelService: updateEvent,
    isRequestValidateRequired: false,
    schemaValidate: eventSchema,
  })
);

module.exports = router;
