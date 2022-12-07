var express = require('express');
const { generateEmail, generatePassword } = require('../helpers/userHelper');
const { createUser, createAdmin } = require('../helpers/userSeeder');
var router = express.Router();

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

router.post('/create/admin', async function(req, res, next) {
  const [status, data, message] = await createAdmin()
  if (status) {
    res.status(200).json({data, message});
  } else {
    res.status(400).json({message});
  }
});

module.exports = router;
