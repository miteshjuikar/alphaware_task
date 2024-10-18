const express =  require('express');
const { connectToMongoDB } = require('./connection');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 8000;
const authRouter = require('./router/auth/authRouter');
const adminRouter = require('./router/admin/admin-routes');
const jobListRouter = require('./router/jobListRouter');

require('dotenv').config();
const userId = process.env.userId;
const userPassword = process.env.userPassword;

//MongoDB Connection
connectToMongoDB(`mongodb+srv://${userId}:${userPassword}@mycluster.krravcy.mongodb.net/companyPortal`)
.then(console.log("MongoDB connected successfully"))
.catch((err)=>console.log(`Error: ${err}`)
);

const frontEndURL = process.env.frontEndURL;

app.use(cors({
    origin: frontEndURL,
    methods: [ 'GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials: true
}));
         
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/list', jobListRouter);


app.listen(PORT, () => console.log(`Server is started on port: ${PORT}`));