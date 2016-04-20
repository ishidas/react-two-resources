'use strict';
const express = require('express');
const app = express();


app.use(express.static('build'));
app.listen(8080, ()=>console.log('Cli-server is listening at port 8080 v^_^v')) ;
