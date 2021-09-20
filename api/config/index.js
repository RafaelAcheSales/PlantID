module.exports = {
    env: process.env.NODE_ENV || 'development',
	database: {
		uri: `mongodb://database:27017/plantid`
	},
};
