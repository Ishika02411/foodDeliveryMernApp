// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       dbName: 'fooddeliveryapp'  // Retain dbName only
//     });

    
//     console.log('Connected to MongoDB Atlas');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }

//   const fetched_data=await mongoose.connection.db.collection("food_items");
// fetched_data.find({}).toArray(function(err,data){
//   if(err) console.log(err);
//   else{
//    global.food_items =data;
//     console.log(global.food_items);
//       }
// });
// };
// module.exports = connectDB;


const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB connected successfully!");

        // Fetch and store food items globally
        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items = fetched_data;
        console.log("Global food items loaded:", global.food_items);
        //
        const foodCategory = await mongoose.connection.db.collection("food_category").find({}).toArray();
        global.food_category = foodCategory;
        console.log("Global food items loaded:", global.food_category);

    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

module.exports = connectDB;
