const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

require('./Controllers/getController')(app,db,bodyParser);
require('./Controllers/postController')(app,db,bodyParser);
require('./Controllers/deleteController')(app,db,bodyParser);
require('./Controllers/putController')(app,db,bodyParser);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
