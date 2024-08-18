const express = require("express")
const connectDB = require("./config/connectDb")
const foodModel = require("./model/foodModel")

const app=express()
app.use(express.json())

connectDB()


//view All the items in the data
app.get('/foods', async(req,res)=>{
    const AllFoods = await foodModel.find({})
    res.json({
        Success:true,
        AllFoods
    })
})

//get particular data
app.get('/foods/:id', async(req,res)=>{
    console.log(req.params.id, "ID")
    try{
        const id = req.params.id;
        const food= await foodModel.findById(id);

        res.json({
            Success:true,
            foodItem
        })
    }
    catch(error){
        res.status(404).json({
            Success:false,
            message:"Unabale to get the Food"
        })
    }
})

//Add additional data to the database
app.post('/foods',async (req, res)=>{
    const {food_name, cost, description} = req.body

    const newFood = new foodModel({
        food_name,
        cost,
        description
    })
    const saveFood = await newFood.save()


    res.status(201).json({
        Success: true,
        FoodItem: saveFood
    });
})


//update the data
app.put('/foods/:id', async (req, res) => {
    const id = req.params.id; // Use req.params.id directly
    const { cost } = req.body;

    // Find the food item by ID
    const foodItem = await foodModel.findById(id);
    if (!foodItem) {
        return res.status(404).json({
            Success: false,
            message: "Food item not found"
        });
    }

    // Update the cost and save the food item
    foodItem.cost = cost;
    const updatedCost = await foodItem.save();

    res.status(200).json({
        Success: true,
        FoodItem: updatedCost
    });
});

//To delete a particular food item from the database
app.delete('/foods/:id',async(req,res)=>{
    const id = req.params.id;

    const deleteFoodItems = await foodModel.findByIdAndDelete(id);
    if(!deleteFoodItems){
        return res.status(404).json({
            Success:false,
            message:"Food items not found"
        })
    }
    res.status(200).json({
        Success:true,
        message:"Successfully deleted"
    })
})

//head

app.head('food/:id',async(req,res)=>{
    const id= req.params.id;

    const foodItem = await foodModel.findById(id);
    if(!foodItem){
        return res.status(404).json({
            Success:false,
            Message:"Not Found"
        })
    }
    res.status(200).json({
        Success:true,
        Message:"Founded"
    })
})

//option

app.options('/foods/:id', (req, res) => {
    // Set the allowed HTTP methods for the resource
    res.setHeader('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
    res.status(204).end(); // No Content
});



app.listen(3001,()=>{
    console.log("Server is running..")
})