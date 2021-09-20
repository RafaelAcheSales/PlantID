var mongoose 		= require('mongoose');  
var config          = require ('../config');
var logger          = require ('./logger');

mongoose.Promise = global.Promise;

const mongoConfig = {
	useNewUrlParser: true,
	socketTimeoutMS: 0,
	keepAlive: true
}

const connection = mongoose.connect(config.database.uri,mongoConfig);

mongoose.connection.on('error', function(err){
	logger.error('Erro ao tentar conectar ao BD: ', err);
	process.exit(1)
});

mongoose.connection.on('connected', function(e){
	logger.info(
		`Conectado com sucesso a ${config.database.uri} MongoDB cluster em ${
			config.env
		} modo.`,
	);
});

mongoose.connection.on('disconnected', function(){
	logger.log('db: mongodb is disconnected!!!');
	process.exit(1)
});

mongoose.connection.on('reconnected', function(){
	logger.info(
		`Reconectado com sucesso a ${config.database.uri} MongoDB cluster em ${
			config.env
		} modo.`,
	);
});

mongoose.connection.on('timeout', function(e) {
	logger.log("db: mongodb timeout "+e);
	process.exit(1)
});

mongoose.connection.on('close', function(){
	logger.log('db: mongodb connection closed');
	process.exit(1)
});

module.exports = connection;