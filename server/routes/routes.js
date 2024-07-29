const express = require('express')
const { register, VerifyOtp, login, GetMyDetails } = require('../controller/UserController')
const Protect = require('../middlewares/auth')
const { AddPatientInfo } = require('../controller/PatientController')
const router = express.Router()


router.post('/Register',register)
router.post('/Verify-Otp',VerifyOtp)
router.post('/login',login)
router.get('/User-details',Protect,GetMyDetails)



// Patient Details Routes
router.post('/Patient-info',Protect,AddPatientInfo)





module.exports =router