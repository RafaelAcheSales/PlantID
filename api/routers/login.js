var express = require('express');
var router = express.Router();

const userCtrl = require('../controllers/user');

//consulta user
router.post('/', userCtrl.login);

module.exports = router;