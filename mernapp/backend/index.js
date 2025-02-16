const express = require('express')
const app = express()
const port = 8000
const connectDB = require('./connect/db')
const fooditems = require('./models/fooditems')
const { default: mongoose } = require('mongoose')

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use(express.json());

// this is to add data of user to create user and this will after run node inex.js ,show in mongodb by showing a new collection
//  of name user
app.use('/api', require('./Routes/CreateUser'))
app.use('/api', require('./Routes/DisplayData'))///this middleware helps by giving ,POST=localhost:8000/api/createuser, sows that 
// connection is true
app.use('/api', require('./Routes/OrderData'))
/////
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//this helps in fetch or read data of collection created in mongodb
// app.get('/fooditem', async (req,res)=> {
//   try {
//     const item= await fooditems.find();
//     console.log(item);
//     res.status(200).json(item);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// })


// const fetched_data=await mongoose.connection.db.collection("food_items");
// fetched_data.find({}).toArray(function(err,data){
//   if(err) console.log(err);
//   else{
//     global.food_items =data;
//     console.log(global.food_items);
//   }
// });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// const fetched_data=await mongoose.connection.db.collection("fooditems");
// fetched_data.find({}).toArray(function(err,data){
//   if(err) console.log(err);
//   else console.log(data);
// });