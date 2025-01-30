const captainController = require('../controllers/captain.controller')
const express = require('express');
const router = express.Router();
const {body} = require("express-validator")

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.plate').isLength({min: 7}).withMessage('Vehicle plate must be at least 7 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Vehicle capacity must be a 1 integer'),
    body('vehicle.type').isIn(['car', 'motorcycle', 'taxi']).withMessage('Invalid vehicle type')

],

    captainController.registerCaptain

)

module.exports = router;