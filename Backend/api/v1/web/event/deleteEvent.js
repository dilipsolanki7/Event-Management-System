const ObjectId = require("mongodb").ObjectID;
const dbService = require("../../../../utilities/dbService");

const deleteEvent = async (req, res) => {
    console.log("deleteevent");
    
    const { id } = req.params;
    const userId = req.user?.userId;  // Authenticated user ID

    // Find the event and check ownership
    const event = await dbService.findOneRecord("eventModel", { _id: ObjectId(id) });
    if (!event) {
        return res.status(404).json({ status: "Error", message: "Event not found" });
    }

    if (event.createdBy.toString() !== userId) {
        return res.status(403).json({ status: "Error", message: "Unauthorized to delete this event" });
    }

    // Delete event (soft delete)
    await dbService.findByConditionAndUpdate("eventModel", { _id: ObjectId(id) }, { isDeleted: true });

    return res.status(200).json({ status: "Success", message: "Event deleted successfully" });
};

module.exports = deleteEvent;
