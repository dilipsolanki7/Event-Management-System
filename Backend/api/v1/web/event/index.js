//api/v1/web/event/index.js
const deleteEvent = require('./deleteEvent');
const editEvent = require('./editEvent');
const listEvents = require('./list');
const saveEvent = require('./save');
const registerEvent = require('./register');
// const getSingleEvent = require('./single');

module.exports = [
    // deleteEvent,
    // editEvent,
    listEvents,
    saveEvent,
    registerEvent,
    // getSingleEvent
];
