var express = require('express');
var router = express.Router();

const userCtrl = require('../controllers/user');

//criar user
router.post('/', userCtrl.newUser);
//atualizar user
router.put('/:email', userCtrl.updateUser);
//deleta user
router.delete('/:email', userCtrl.delUser);
//resgata user
router.get('/:email', userCtrl.getUser);
//resgata  todos users
router.get('/all', userCtrl.getAll);

module.exports = router;