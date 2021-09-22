const ModelUser = require('../models/user')
const User = require('../repositories/user');
const Logger = require('../utils/logger');

//const { v1: uuidv1 } = require('uuid');
const logger = require('../utils/logger');

//OK
exports.newUser = (req,res) =>{
    //user.uuid = uuidv1();
    //verificar se o usuario existe.
    logger.log(req.body)
    User.getByEmail(req.body.email)
    .then(user => {
        if(user.length > 0){
            //usuario existe
            res.status(400).send('Usuário já existe!')
        } else {
            let user = new ModelUser(req.body);
            user.save()
            .then(userBD => {
                res.status(200).send('Usuário Criado!');
            })
        }
    })
    .catch(err => {
        res.status(500).send('Erro interno do servidor: ' +  err.errors);
    })
};

//OK
exports.getUser = (req,res) =>{
    User.getByEmail(req.params.email)
    .then(user => {
        res.json(user[0]);
    })
    .catch(err => {
        res.status(422).send('erro ao tentar buscar usuário: ' +  err.errors);
    })

};

//OK
exports.getAll = (req,res) =>{
    User.getAll()
    .then(users =>{
        res.json(users);
    })
    .catch(err=>{
        res.status(422).send('erro ao tentar buscar usuários: ' +  err.errors);
    })
};

//OK
exports.delUser = (req,res) =>{
    User.delete(req.params.email)
    .then(user => {
        res.status(200).send('Usuario Deletado');
    })
    .catch(err => {
        res.status(422).send('erro ao tentar deletar usuário: ' +  err.errors);
    })
};

//OK
exports.updateUser = (req,res) =>{
    console.log(req.params.email,req.body)
    User.update(req.params.email,req.body)
    .then(user => {
        res.status(201).send('Usuario Atualizado');
    })
    .catch(err => {
        res.status(422).send('erro ao tentar atualizar usuário: ' +  err.errors);
    })
};


exports.login = (req,res) =>{
    //ver se encontro o email passado no body
    logger.log(req.body.email)
    User.getByEmail(req.body.email)
    .then(user => {
        logger.log(user)
        if(req.body.password == user[0].password){
            res.status(200).send('login autorizado!'); // login autorizado
        }
        else {
            res.status(404).send('Usuario nao encontrado')
        }
    })
    .catch(err => {
        res.status(500).send('Erro no servidor: ' +  err);
    })

};