
const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { addUser, getUser } = require("../../../../services/user/user");
const { decodeJwtTokenFn } = require("../../../../utilities/universal"); // Import the decode function
const router = new Router();

/**
 * @swagger
 * /api/v1/user/add:
 *  post:
 *   tags: ["User"]
 *   summary: Save Contractor information.
 *   description: api used for Save Contractor information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: Save Contractor information.
 *        schema:
 *         type: object
 *         properties:
 *           fullName:
 *             type: string
 *           email:
 *             type: string
 *           phone:
 *             type: string
 *           password:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */

const dataSchema = Joi.object({
  fullName: Joi.string().required().label("fullName"),
  email: Joi.string().required().label("email"),
  phone: Joi.string().required("phone"),
  password: Joi.string().required("password"),
});

router.post(
  "/add",
  commonResolver.bind({
    modelService: addUser,
    isRequestValidateRequired: true,
    schemaValidate: dataSchema,
  })
);

router.get(
  "/profile",
  decodeJwtTokenFn,
  commonResolver.bind({
    modelService: getUser,
    isRequestValidateRequired: false,
  })
);

module.exports = router;
