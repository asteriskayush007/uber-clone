const captainModel = require('../models/captian.model');
const captainService = require('../services/captain.service')
const {validationResult} = require("express-validator")

module.exports.registerCaptain = async (req, res, next) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(401).json({error: error.array()});
    }

    const{fullname, email, password, vehicle} = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});

    if(isCaptainAlreadyExist){
        return res.status(400).json({message: 'Captain already exist'});
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.type
    });

    const token = captain.generateAuthToken();


    res.status(201).json({token, captain});
}