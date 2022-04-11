import express from "express"       //for importing modules like this we need to adee ("type": "module") in package.json
import cors from "cors"             //importing  Cross-Origin Resource Sharing for API's and loading resources
import mongoose from "mongoose"     //using Application programming interface

const app = express()               //creating class object for our app
app.use(express.urlencoded())       //this will recognize the incoming request object as string or arrays
app.use(express.json())             //recognize the request as json object    
app.use(cors())

mongoose.connect("mongodb://localhost:27017/mykeeperAppDB",         //to connect mongoDB
        {useNewUrlParser: true, useUnifiedTopology: true}, 
        () => console.log("DB connected")                           //When database is connected it will show DB connected             
    )

const keeperSchema = mongoose.Schema({                          //step 1 -> Creating the schema
    title: String,                              //title of string type 
    description: String                         //description of string type    
})

const Keeper = new mongoose.model("Keeper", keeperSchema)       //step 2 -> Creating the mdoel 

//using the nodemon in place of node so that every time we save it will automatically restart the backend
//node index.js => nodemon index.js


app.get("/api/getAll", (req, res) => {
        Keeper.find({}, (err, keeperList) => {      //using find fetch the all data and sent the objects of whole list
        if(err){
            console.log(err)
        } else {
            res.status(200).send(keeperList)
        }
    })
})

//Totally we want three api 
//1.To get the data
//2.to add the data
//3.to delete the data

app.post("/api/addNew", (req, res) => {
    const { title, description } = req.body         //taking out title and discription from the body
    const keeperObj = new Keeper({
        title,
        description
    })
    keeperObj.save( err => {                        //save the data in database        
        if(err){                                    //Error handling                
            console.log(err)
        }                                               
        Keeper.find({}, (err, keeperList) => {      //find function returning array of all objects
            if(err){                                //Error handling    
                console.log(err)
            } else {
                res.status(200).send(keeperList)     //Sending the data over the site    
            }
        })
    })

})

app.post("/api/delete", (req, res) => {                     //by call from delete _id is passed and that id keeper note
    const { id } = req.body                                 //is going to be deleted    
    Keeper.deleteOne({ _id: id}, () => {                    //using mongo deleteOne api to delete specified id note    
        Keeper.find({}, (err, keeperList) => {
            if(err){
                console.log(err)
            } else {
                res.status(200).send(keeperList)
            }
        })
    })

})

app.listen( 3001, () => {
    console.log("Backend created at port 3001")
})