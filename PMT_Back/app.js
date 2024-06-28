const express = require('express');
const pool = require("./database.js");


const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());


const administrateurController = require("./Controllers/administrateurController"); 


app.get('/test', function (req, res) {
    res.send('Hello, World!');
});
// or : app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

app.use("/", administrateurController);


// ********* Listening to port *********
// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
