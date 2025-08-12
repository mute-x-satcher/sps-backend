const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 3001

const {connectDB} = require("./db/db")
const userRoutes = require('./routes/userRoutes')
const subjectRoutes = require('./routes/subjectRoutes')
const topicRoutes = require('./routes/topicRoutes')
const taskRoutes = require('./routes/taskRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')

connectDB() // Connecting MongoDB

//Routes

app.use(cors({}))
app.use(express.json()) // This for parsing in json

app.use('/user',userRoutes)
app.use('/subject',subjectRoutes)
app.use('/topic',topicRoutes)
app.use('/task',taskRoutes)
app.use('/dashboard',dashboardRoutes)

app.listen(PORT,() => console.log(`Server started on PORT: ${PORT}`));

