const express = require("express");
const { connectToMongoDB } = require("./connect");
const user = require('./routes/user')


const app = express();
const PORT = 8002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect MongoDB

connectToMongoDB('mongodb+srv://kewatvipulkumar:Vipul123@cluster0.furkukm.mongodb.net/Users')
.then(() => console.log("MongoDB Connected!"))
.catch(err => console.error("MongoDB Connection Failed:", err));



// routes 

app.use('/user', user)

app.listen(PORT, () => console.log(`Server Started at PORT: ${8002}`));