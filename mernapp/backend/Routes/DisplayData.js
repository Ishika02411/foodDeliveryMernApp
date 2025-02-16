const express = require('express')
const router = express.Router()

router.post('/foodData', (req,res)=>{
    try {
        console.log(global.food_items, global.food_category);
        res.send([global.food_items, global.food_category])
    } catch (error) {
        console.error(error.message);
        res.send("Server Error")
    }
})

module.exports = router;

//tKYuJMj9iMw0g2hL
// mongodb+srv://chauhanishika97:tKYuJMj9iMw0g2hL@cluster0.sr37m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
