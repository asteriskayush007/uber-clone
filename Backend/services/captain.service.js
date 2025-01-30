const captainModel = require('../models/captian.model');

module.exports.createCaptain = async ({
    firstname, lastname, email, password, plate, vehicleType, capacity
}) => {
    if (!firstname || !lastname || !email || !password  || !plate || !vehicleType || !capacity) {
        throw new Error('Missing required fields');
    }

    

    // Validate vehicle plate
    if (plate.length < 7) {
        throw new Error('Vehicle plate must be at least 7 characters long');
    }

    // Validate vehicle type
    const validVehicleTypes = ['car', 'motercycle', 'taxi']; // Add more vehicle types if needed
    if (!validVehicleTypes.includes(vehicleType)) {
        throw new Error('Invalid vehicle type');
    }

    // Create captain logic here

    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            plate,
            capacity,
            vehicleType
        }
    });

    return captain;
}