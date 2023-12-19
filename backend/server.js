const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Usermodel = require("./models");
const bcrypt = require("bcrypt");

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

app.listen(3000, () => {
  console.log("server started on port 3000");
});
