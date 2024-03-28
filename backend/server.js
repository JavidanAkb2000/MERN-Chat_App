import  express  from 'express';
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import bodyParser from 'body-parser';
import connecToMongoDb from './db/ConnecToMongo.js';

const app = express();
const PORT = process.env.PORT || 4500;
dotenv.config();//starts giving PORT

app.use(bodyParser.json());

app.use("/api/auth",authRoutes);

// app.get("/",(req,res)=>{
//     res.send('Hello Javidan , I am the root route working through dotenv port!!!');
// });


// app.get("/api/auth/signup",(req,res)=>{
//     res.send('Signup Route');
// });



// app.get("/api/auth/login",(req,res)=>{  //All these starts with route /api/auth. 
//     res.send('Login Route');            that's why we'll use express middleware     
// });

// app.get("/api/auth/logout",(req,res)=>{
//     res.send('Logout Route');
// });


app.listen(PORT,()=> {
    connecToMongoDb();
    console.log(`Server is running on PORT ${PORT}`);
});