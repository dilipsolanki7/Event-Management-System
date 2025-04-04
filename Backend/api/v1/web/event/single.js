const Event = require('../../../collections/Event');

const getSingleEvent = async (req, res) => {
    console.log("singleevent");
    
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving event', error });
    }
};

module.exports = getSingleEvent;
