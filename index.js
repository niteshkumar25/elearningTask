const express = require('express');
const app = express();
require('./config/db');
const route = require('./routes/apisRoutes');



const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', route);
app.listen(PORT, ()=>{
    console.log("Sever is Running on ", PORT);
});

