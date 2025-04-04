//\services\event\event.js
//const ObjectId = require("mongodb").ObjectID;
const {ObjectId } = require("mongodb");
const dbService = require("../../utilities/dbService");
const { eventModel } = require("../../collections");

/*************************** addEvent ***************************/
const addEvent = async (req, res) => {
    console.log("res-body->", req.body);
    console.log("res-user->", req.user);

    const { title, organizer, date, time, description, venue, photoURL, registrationFee, maxSlots } = req.body; // Added photoURL

    let eventData = await dbService.findOneRecord("eventModel", { title, date }); // Check for unique title and date

    if (eventData) {
        throw new Error("Event with this title already exists!");
    } else {
        req.body = {
            ...req.body,
            createdBy: ObjectId(req.user.userId)
        }
        let newEvent = await dbService.createOneRecord("eventModel", req.body);
        return "Event added successfully";
    }
};

/*************************** getEvents ***************************/
const getEvents = async (req, res) => {

    console.log("req.body");

    let postData = req.body;

    // console.log("here->");
    let result = await dbService.findAllRecords(
        "eventModel",
        {}
    );
    //console.log("he->", result);

    // var results = await contractorModel.findOrderWithSort(
    //   "contractorModel",
    //   where,
    //   sort,
    //   skiprecord,
    //   limit
    // );
    // var result = JSON.parse(JSON.stringify(results));
    // if (result.length !== 0) {
    //   for (let i = 0; i < result.length; i++) {
    //     Object.assign(result[i], {
    //       fullName: result[i].firstName + " " + result[i].lastName,
    //     });
    //   }
    // }
    return {
        status: "Success",
        message: "all Event fetched successfully.",
        items: result,
    };
    // } else {
    //   throw new Error("Contractor Not found");
    // }
};

/*************************** getEventsByUserId ***************************/
const getEventsByUserId = async (req, res) => {
    let postData = req.body;

    // console.log("here->");
    let result = await dbService.findAllRecords(
        "eventModel",
        {
            createdBy: ObjectId(req.user.userId)
        }
    );
    // console.log("he->", result);

    return {
        status: "Success",
        message: "all Event fetched successfully.",
        items: result,
    };
    // } else {
    //   throw new Error("Contractor Not found");
    // }
};

/*********************************** searchEvents ***************************** */
const searchEvents = async (req) => {
    try {
        const { key, limit } = req.query;
        console.log("Key:",key);
        if (!key) return [];
        // Regex for searching titles that start with or contain the word
        const query = { title: { $regex: `^${key}|${key}`, $options: "i" } };
        const options = { limit: parseInt(limit) || 5 };

        // Fetch matching events using the findAllRecords function
        const searchResults = await dbService.findAllRecords("eventModel", query);
    
        return searchResults;
    } catch (error) {
      console.error("Error searching events:", error);
      throw new Error("Failed to fetch events");
    }
};

/*************************** getEventsRegisteredByUser ***************************/
const getEventsRegisteredByUser = async (req, res) => {
    //let postData = req.body;

    //console.log("postData->",postData);
    //const userId = req.user.userId; 
    const userId = req.user.userId; // Get logged-in user ID
    console.log("UserId:",userId);
    // Validate and convert userId to ObjectId
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({
            status: "Error",
            message: "Invalid user ID format",
        });
    }
    let result = await dbService.findAllRecords(
        "eventModel",
        {
            // createdBy: ObjectId(req.user.userId)
            registeredUsers: ObjectId(req.user.userId)
        }
    );
    console.log("fetched events->", result);

    return {
        status: "Success",
        message: "all Event fetched successfully.",
        items: result,
    };
    // } else {
    //   throw new Error("Contractor Not found");
    // }
};

/*************************** getEventById ***************************/
const getEventById = async (req, res) => {
    console.log("geteventbbyid");

    const { id } = req.params;
    let event = await dbService.findOneRecord("eventModel", { _id: ObjectId(id) });
    if (!event) {
        throw new Error("Event not found");
    }
    return event;
};

/*************************** getEventsBasedOnUserId ***************************/
const getEventsBasedOnUserId = async (req, res) => {
    try {
        const userId = req.user.userId; // Extracted from decodeJwtTokenFn
        console.log(userId);
        const result = await dbService.findAllRecords("eventModel", {
            createdBy: userId,
        });

        return res.status(200).json({
            status: "Success",
            message: "User-specific events fetched successfully.",
            items: result,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Failed to fetch events.",
            error: error.message,
        });
    }
};


/*************************** updateEvent ***************************/
const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, organizer, date, time, description, venue, photoURL, maxSlots, registrationFee } = req.body; // Destructure all fields
    const updatedData = { title, organizer, date, time, description, venue, photoURL, registrationFee, maxSlots }; // Include photoURL


    let updatedEvent = await dbService.findOneAndUpdateRecord("eventModel", { _id: ObjectId(id) }, updatedData);
    return "Event updated successfully";
};

/*************************** deleteEvent ***************************/
const deleteEvent = async (req, res) => {
    const { id } = req.params;

    await dbService.findByConditionAndUpdate("eventModel", { _id: ObjectId(id) }, { isDeleted: true });
    return "Event deleted successfully";
};

/*************************** registerUserForEvent ***************************/
// const registerUserForEvent = async (eventId, userId) => {
//   const event = await dbService.findOneRecord("eventModel", { _id: new ObjectId(eventId) });
//   if (!event) {
//       throw new Error("Event not found");
//   }

//   // Ensure registeredUsers array exists
//   event.registeredUsers = event.registeredUsers || [];

//   // Check if user is already registered
//   if (event.registeredUsers.includes(userId)) {
//       throw new Error("User already registered for this event");
//   }

//   // Check if slots are available
//   if (event.registeredUsers.length >= event.maxSlots) {
//       throw new Error("No available slots for this event");
//   }

//   // Add user to event registration
//   await dbService.findByConditionAndUpdate(
//       "eventModel",
//       { _id: new ObjectId(eventId) },
//       { $addToSet: { registeredUsers: new ObjectId(userId) } }
//   );

//   // Add event to user's registered events list
//   await dbService.findByConditionAndUpdate(
//       "userModel",
//       { _id: new ObjectId(userId) },
//       { $addToSet: { registeredEvents: new ObjectId(eventId) } }
//   );

//   return { message: "User registered successfully!", eventId, userId };
// };
const registerUserForEvent = async (req, res) => {
    //console.log("res-body->", req.body);
    const eventData = req.body;
    //console.log("res-user->", eventData.eventId);

    const eventId = new ObjectID(eventData.eventId); 
    let event = await dbService.findOneRecord("eventModel", {
        _id: eventId
    });

    //console.log("event->", event);
    // let eventDat = await dbService.findOneRecord("eventModel",
    //     {
    //         _id: ObjectID(eventData.eventId)
    //     }
    // ); // Check for unique title and date
    // console.log("event->", eventDat);

    // const eventt = await dbService.findOneRecord("eventModel",
    //     {
    //         _id: eventData.eventId

    //     });
    // console.log("event->", eventt);

    if (!event) {
        return { success: false, message: "Event not found." };
    }

    // Ensure registeredUsers array exists
    event.registeredUsers = event.registeredUsers || [];

    // Check if user is already registered
    if (event.registeredUsers.some(user => user.toString() === req.user.userId)) {
        return { success: false, message: "You are already registered for this event!" };
        //return { message: "User already registered for this event!"};
    }

    // Check if slots are available
    if (event.registeredUsers.length >= event.maxSlots) {
        return { success: false, message: "No available slots for this event!" };
    }

    // **Update both user and event in a single operation**
    // const session = await dbService.startSession();
    // session.startTransaction();

    try {
        // Add user to event registration
        let eventD = await dbService.findOneAndUpdateRecord(
            "eventModel",
            { _id: eventId },
            { $addToSet: { registeredUsers: new ObjectId(req.user.userId) } },
            { new: true } // Ensures the updated document is returned
        );

        console.log("Updated eventInfo-->", eventD);


        // Add event to user's registered events list
        let userU = await dbService.findOneAndUpdateRecord(
            "userModel",
            { _id: new ObjectId(req.user.userId) },
            { $addToSet: { registeredEvents: eventId } },
            { new: true }
        );
        console.log("Updated userInfo-->", userU);


        // Commit the transaction
        // await session.commitTransaction();
        // session.endSession();

        return { success: true, message: "You have successfully registered for the event!" };

    } catch (error) {
        // await session.abortTransaction();
        // session.endSession();
        return { success: false, message: "Registration failed: " + error.message };

    }
};


module.exports = {

    addEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    getEventsBasedOnUserId,
    getEventsByUserId,
    registerUserForEvent,
    getEventsRegisteredByUser,
    searchEvents

};
