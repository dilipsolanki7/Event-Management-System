
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { getEvents,getEventById,searchEvents } = require("../../../../services/event/event");
const router = new Router();
const { getEventsByUserId } = require("../../../../services/event/event");
const { decodeJwtTokenFn } = require("../../../../utilities/universal");


/**
 * @swagger
 * /api/v1/contractor/getcontractor:
 *  post:
 *   tags: ["Contractor"]
 *   summary: get Contractor information.
 *   description: api used for get Contractor information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: get Contractor information.
 *        schema:
 *         type: object
 *         properties:
 *           contractorType:
 *             type: string
 *           page:
 *             type: string
 *           limit:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 *   security:
 *      - bearerAuth: []
 */

router.post(
  "/getevent",
  commonResolver.bind({
    modelService: getEvents,
    isRequestValidateRequired: false,
  })
);

/* router.get(
  "/user/:userId",
  commonResolver.bind({
    modelService: getEventsBasedOnUserId,
    isRequestValidateRequired: false,
  })
); */
router.get(
  "/myevents",
  decodeJwtTokenFn, // Middleware to decode token and get userId
  commonResolver.bind({
    modelService: getEventsByUserId,
    isRequestValidateRequired: false,
  })
);

router.get(
  "/:id",
  //decodeJwtTokenFn, // Middleware to decode token and get userId
  commonResolver.bind({
    modelService: getEventById,
    isRequestValidateRequired: false,
  })
);

router.get(
  "/",
  commonResolver.bind({
    modelService: searchEvents, // Service function to handle search
    isRequestValidateRequired: false,
  })
);

module.exports = router;
