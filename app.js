const express = require('express');
require('dotenv').config();
const cors = require('cors')

// Imports from my custom logics
const PORT = process.env.PORT || 3007;
const tasksRoutes = require('./routes/tasksRoutes');
const connectDB = require('./config/dbConfig');

// Express App
const app = express();

// middlewares
app.use(cors())
app.use(express.static("./public"))
app.use(express.json());



// routes
app.get('/', (req, res) => {
    res.send("Welcoe to the Task Manager API")
})
app.use('/api/tasks', tasksRoutes);
app.use((req, res) => {
    res.send("Sorry! This Route doesn't exist")
})

//connect database
const connectAndListen = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        })
    } catch (error) {
        console.log(error.message);        
    }
}


connectAndListen();
