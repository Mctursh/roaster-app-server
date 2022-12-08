var express = require('express');
const { generateEmail, generatePassword } = require('../helpers/userHelper');
const { createUser, createAdmin, updateSchedule } = require('../helpers/userSeeder');
var router = express.Router();
const moment = require('moment')
const { User } = require('../models/userModel');

/* GET users listing. */
router.post('/create', async function(req, res, next) {
  const { firstName, lastName } = req.body
  const genEmail = generateEmail(firstName, lastName)
  const genPassword = generatePassword()
  const [status, data, message] = await createUser(firstName, lastName, genEmail, genPassword)
  if (status) {
    const {password, ...dataToSend} = data.toJSON()
    res.status(200).json({dataToSend, message});
  } else {
    res.status(400).json({message});
  }
});

router.post('/create-admin', async function(req, res, next) {
  const [status, data, message] = await createAdmin()
  if (status) {
    res.status(200).json({data, message});
  } else {
    res.status(400).json({message});
  }
});

router.post('/generate-shift', async(req, res) => {
  const [status, message] = await updateSchedule()
  if (status) {
    res.status(200).json({message})
  } else {
    res.status(400).json({message})
  }
})

// router.get('/get-user-shift/:id', async(req, res) => {
//   const { id } = req.params
//   // const [status,]
// })

module.exports = router;
