const express =require('express');
const expressValidator=require('express-validator');
const cors=require('cors');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');


const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(expressValidator());

mongoose.connect('mongodb://localhost:27017/addressbook',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Database connected successfully");
}).catch((error)=>{
    console.log("Database not connected",error);
})

app.listen(3000, () => {
    console.log(`server is listening on port 3000 `);
});