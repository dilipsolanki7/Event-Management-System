//api\v1\web\event\register.js
const { Router } = require("express");
// import { commonResolver } from '../../../../utilities/commonResolver';
const commonResolver = require("../../../../utilities/commonResolver");
const { registerUserForEvent, getEventsRegisteredByUser } = require('../../../../services/event/event');
const { decodeJwtTokenFn } = require("../../../../utilities/universal"); // Import the decode function
const router = new Router();

router.post(
  "/register",
  decodeJwtTokenFn,
  commonResolver.bind({
    modelService: registerUserForEvent,
    isRequestValidateRequired: false,
  })
);

router.get(
  "/mybookings",
  decodeJwtTokenFn,
  commonResolver.bind({
    modelService: getEventsRegisteredByUser,
    isRequestValidateRequired:false,
  })
);

module.exports = router;

