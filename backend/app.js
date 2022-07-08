import  express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json()) // in place of bodyparser 
app.use("/api/user", router); //http://localhost:5000/api/user/login 
app.use("/api/blog", blogRouter)

const __dirname = path.resolve();

mongoose.connect(
    "mongodb+srv://admin:Hussenat2020!@cluster0.khyw0.mongodb.net/Blog?retryWrites=true&w=majority"
).then(()=>app.listen(5000))
.then(()=>{
    console.log("Connected to Database & Listening To Localhost 5000"); 
})
.catch((error)=>{
    console.log(error.message)
})

// Server Production assets
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.get("*", (req, res) => res.sendFile(path.join(__dirname, "frontend/dist/index.html")))
}

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});

// This is for local mongo db
// mongoose.connect("mongodb://localhost/Blog", {
//     // config.MONGODB_URL_COMPASS, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useCreateIndex: true, // it causing the error because of the version
// }).then(()=>app.listen(5000))
// .then(()=>{
//     console.log("Connected to Database and Listening To Localhost 5000"); 
// })
// .catch((error)=>{
//     console.log(error.message)
// })