const ObjectId = require("mongodb").ObjectID;
const dbService = require("../../../../utilities/dbService");

const editEvent = async (req, res) => {
    console.log("editevent");
    
    const { id } = req.params;
    const { title, date, time, description, venue, photoURL, registrationFee, maxSlots } = req.body;
    const userId = req.user?.userId;  // Authenticated user ID

    // Find the event and check ownership
    const event = await dbService.findOneRecord("eventModel", { _id: ObjectId(id) });
    if (!event) {
        return res.status(404).json({ status: "Error", message: "Event not found" });
    }

    if (event.createdBy.toString() !== userId) {
        return res.status(403).json({ status: "Error", message: "Unauthorized to edit this event" });
    }

    // Update event, retain photoURL if not provided
    await dbService.findByConditionAndUpdate("eventModel", { _id: ObjectId(id) }, {
        title, 
        date, 
        time, 
        description, 
        venue, 
        photoURL: photoURL || event.photoURL, // Retain existing photoURL if not provided
        registrationFee, 
        maxSlots
    });


    return res.status(200).json({ status: "Success", message: "Event updated successfully" });
};

module.exports = editEvent;
