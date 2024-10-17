const express =  require('express');
const { connectToMongoDB } = require('./connection');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8000;
const authRouter = require('./router/auth/authRouter');


require('dotenv').config();
const userId = process.env.userId;
const userPassword = process.env.userPassword;

//MongoDB Connection
connectToMongoDB(`mongodb+srv://${userId}:${userPassword}@mycluster.krravcy.mongodb.net/companyPortal`)
                    .then(console.log("MongoDB connected successfully"))
                    .catch((err)=>console.log(`Error: ${err}`)
                );
   

app.use(cors({
    origin: "http://localhost:5173",
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
            
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/auth', authRouter);


app.listen(PORT, () => console.log(`Server is started on port: ${PORT}`));