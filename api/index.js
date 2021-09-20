const express = require('express');
const app = express();
const mongo = require("./utils/db");
const logger = require("./utils/logger");
const port = process.env.PORT || 3000

var bodyParser = require("body-parser");
var cors = require('cors');
var corsOptions = {
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
    optionsSuccessStatus: 204
};


// Configuração da view engine
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors(corsOptions));


//rotas
//const apiRoute = require('./routers/api')
//const appRoute = require('./routers/app')

//app.use('/api', apiRoute);
app.use('/', (req, res) => {
    res.send('Hello World API!')
});

app.listen(port, () => {
    logger.log(`Example app listening at http://localhost:${port}`)
})