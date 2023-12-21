const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Usermodel = require("./models/models");
const bcrypt = require("bcrypt");
const Productmodel = require("./models/productmodel")
const Catmodel = require("./models/CatModel");
const Fishmodel = require("./models/FishModel");

const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://tangiro:2003@cluster0.cqer9fk.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/api/register", async (req, res) => {
  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    console.log(req.body)
    try {
      const userModel = await Usermodel.create({
        petname: req.body.petName,
        petguardian: req.body.petGuardian,
        email: req.body.email,
        password: hash,
        

      });
      return res.status(200).send({status: 'ok'});
    } catch (err) {
      return res.status(500).send({error: 'duplicate mail'});
    }
  });
});

async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}

app.post("/api/login", async (req, res) => {
try{
  const userModel = await Usermodel.findOne({
    email: req.body.email,
  });
  let passwordMatching = await comparePassword(
    req.body.password,
    userModel.password
  );

  if (!passwordMatching) {
    console.log("error")
    // return res.json({ status: "error", userModel: false });
    return res.status(500).send({error: 'hello i failed'});
  } else {
    const userData = {
      id: userModel._id,
      petName: userModel.petname ,
      petGuardian: userModel.petguardian,
      email: userModel.email,
      
    }
    console.log("done");
    console.log(userData)
    // return res.json({ status: "ok", userModel: true });
    return res.status(200).send({status: 'ok', user: userData,});
  }
}catch(error){
  return res.status(500).send("internal server error")
}
 
});
app.post("/api/postdogproducts",async(req,res)=>{
  try{
  const Products = await Productmodel.create({
    
    name: req.body.name,
    imageurl: req.body.imageurl,
    price: req.body.price,
    rating:req.body.rating

  });
  return res.status(200).send({status:"ok"});
}catch(error){
  return res.status(500).send("internal server error")
}
})

app.get("/api/dogproducts", async (req, res) => {
  try {
    const productmodels = await Productmodel.find();
    return res.status(200).json(productmodels);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});



app.post("/api/postcatproducts",async(req,res)=>{
  try{
  const CatProducts = await Catmodel.create({
    
    name: req.body.name,
    imageurl: req.body.imageurl,
    price: req.body.price,
    rating:req.body.rating,
    desc:req.body.desc

  });
  return res.status(200).send({status:"ok"});
}catch(error){
  return res.status(500).send("internal server error")
}
})

app.get("/api/catproducts", async (req, res) => {
  try {
    const catmodels = await Catmodel.find();
    return res.status(200).json(catmodels);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});



app.post("/api/postfishproducts",async(req,res)=>{
  try{
  const FishProducts = await Fishmodel.create({
    
    name: req.body.name,
    imageurl: req.body.imageurl,
    price: req.body.price,
    rating:req.body.rating,
    desc:req.body.desc

  });
  return res.status(200).send({status:"ok"});
}catch(error){
  return res.status(500).send("internal server error")
}
})

app.get("/api/fishproducts", async (req, res) => {
  try {
    const fishmodels = await Fishmodel.find();
    return res.status(200).json(fishmodels);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});




app.get("/api/petproducts",async(req,res)=>{
  try{
    const fishmodels = await Fishmodel.find();
    const dogmodels = await Productmodel.find();
    const catmodels = await Catmodel.find();

    return res.status(200).json({fishmodels,dogmodels,catmodels})
  }
  catch(err){
    return res.status(500).send("Internal Server Error");

  }
})







app.listen(3000, () => {
  console.log("server started on port 3000");
});
