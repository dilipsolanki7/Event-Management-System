const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { onLogin } = require("../../../../services/user/user");
const router = new Router();

/**
 * @swagger
 * /api/v1/user/login:
 *  post:
 *   tags: ["User"]
 *   summary: user login api
 *   description: api used to login users
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The user to login.
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           email:
 *             type: string
 *             required:
 *           password:
 *             type: string
 *             required:
 *   responses:
 *    "200":
 *     description: success
 */

const dataSchema = Joi.object({
    email: Joi.string().required().label("email"),
    password: Joi.string().required("password"),
});

router.post('/login',
    commonResolver.bind({
        modelService: onLogin,
        isRequestValidateRequired: true,
        schemaValidate: dataSchema
    }))


module.exports = router;
