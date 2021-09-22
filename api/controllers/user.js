const ModelUser = require('../models/user')
const User = require('../repositories/user');
const Logger = require('../utils/logger');

const { v1: uuidv1 } = require('uuid');
const logger = require('../utils/logger');

exports.newUser = (req,res) =>{
    let user = new ModelUser(req.body);
    user.uuid = uuidv1();
    user.save()
    .then(userBD => {
        res.status(200).send('Usuário Criado!');
    })
    .catch(err => {
        logger.log(err);
        res.status(500).send('Erro ao tentar criar usuário')
    })
};

exports.getUser = (req,res) =>{
    User.getByEmail(req.params.email)
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res.status(422).send('erro ao tentar buscar usuário: ' +  err.errors);
    })

};

exports.getAll = (req,res) =>{
    User.getAll()
    .then(users =>{
        res.json(users);
    })
    .catch(err=>{
        res.status(422).send('erro ao tentar buscar usuários: ' +  err.errors);
    })
};

exports.delUser = (req,res) =>{
    User.delete(req.params.email)
    .then(user => {
        res.send(200);
    })
    .catch(err => {
        res.status(422).send('erro ao tentar deletar usuário: ' +  err.errors);
    })
};

exports.updateUser = (req,res) =>{
    User.update(req.params.email,req.body)
    .then(user => {
        res.status(201);
    })
    .catch(err => {
        res.status(422).send('erro ao tentar atualizar usuário: ' +  err.errors);
    })
};

exports.login = (req,res) =>{
    //ver se encontro o email passado no body
    User.getByEmail(req.body.email)
    .then(user => {
        if(req.body.password == user.password){
            res.status(200); // login autorizado
        }
        res.status(404).send('Usuario nao encontrado')
    })
    .catch(err => {
        res.status(404).send('Usuario nao encontrado: ' +  err.errors);
    })

};