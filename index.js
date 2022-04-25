const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.port || 5000;
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const moment = require('moment'); //for date formatting
// const { name } = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
//something new

const conn = mongoose.createConnection("mongodb://localhost:27017/categoryDB", {
  useNewUrlParser: true,
});


const conn2 = mongoose.createConnection("mongodb://localhost:27017/empDB", {
  useNewUrlParser: true,
});


const itemSchema = new mongoose.Schema({
  itemcategory: { type: String, required: true },
  itemId: { type: Number, required: true, unique: true },
  itemname: { type: String, required: true, unique: true },
  itemPrice: { type: Number, required: true },
  Stock: { type: Number, required: true },
  itemSold: { type: Number, required: true },
});


const empSchema = mongoose.Schema({
  empID: { type: String, required: true, unique: true }, 
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  DOB: { type: Date, required: true },
  position: {type: String, required: true},
  SSN: { type: Number, required: false, null: true},
  password: {type:String, required: true}
});

const secret = "Thisisourlittlesecret.";
itemSchema.plugin(encrypt, { secret: secret, encryptFields: ["password", "SSN"] });


const inventoryModel = conn.model("Item",itemSchema);
const employeeModel = conn2.model("empItem",empSchema);

app.get("/", (req,res)=> {
  res.redirect("/login");
})

app.get("/login", (req, res) => {
  console.log(`I am in login get`);
  // res.sendFile(__dirname + "/Login.html");
  res.render("login", {errorMsg: ""});
});


app.post("/login", (req, res) => {
  console.log("We are in login post");
  const id = req.body.myId;
  const password = req.body.myPassword;

  // console.log(employeeModel.findOne({'empID': id}));
  employeeModel.findOne({'empID': id},(err, doc)=> {
    if(doc.length === 0 || err){
      console.log(err);
      console.log("I'm in login error")
      res.render("login", {errorMsg: "Please enter vaild id or password."});
      // res.status(403).send("Access denied.");
      // res.send(403, "No rights to access");
    }else{
      console.log(doc.password);
      if(doc){
        if (doc.password === password){
          res.redirect("/mainMenu");
        }else{
          res.render("login", { errorMsg: "Please enter vaild id or password." });
        }
      }
    }
  })
});

app.get("/mainMenu", (req, res) => {
  console.log("I am in main page");
  res.sendFile(__dirname + "/MainMenu.html");
});

app.get("/charts", (req, res) => {
  console.log("View Charts.");
  res.sendFile(__dirname + "/charts.html");
});

app.get("/inventory", (req, res) => {
  //res.sendFile(__dirname + "/Inventory.html");

  return inventoryModel.find(function(err, items) {
    if(err) {
      console.log(err);
    } else {
      res.render("management", {
        titleName: "Inventory",
        itemName: "Product",
        fields: {
          col1: "Product Name",
          col2: "Product ID",
          col3: "Category",
          col4: "Quantity",
          col5: "Price"
        },
        items: items
      }); 
    }
  }).sort({'itemId': 1});
});

app.get("/staffs", (req, res, next) => {

  return employeeModel.find(function(err, staffs) {
    if(err) {
      console.log(err);
    } else {
      res.render("management", {
        titleName: "Staff",
        itemName: "Employee",
        fields: {
          col1: "First Name",
          col2: "Last Name",
          col3: "Employee ID",
          col4: "Position",
          col5: "Date of Birth"
        },
        staffs: staffs,
        moment: moment
      }); 
    }
  }).sort({'position': -1});
});

app.get("/category", (req, res, next) => {
  // res.sendFile(__dirname + "/category.html");
  // res.render("category");
  // const cat = "Dairy and eggs";
  return inventoryModel.find(function (err, items) {
    if (err) {
      console.log(err);
    } else {
      // console.log(items);
      res.render("category", { items });
    }
  });
});

app.post("/insert-product", (req, res, next) => {

  let newProduct = new inventoryModel({
    itemcategory: req.body.pCategory,
    itemId: req.body.pID,
    itemname: req.body.pName,
    itemPrice: req.body.pPrice,
    Stock: req.body.pStock,
    itemSold: 0
  });

  newProduct.save();

  res.redirect("back");
});

app.post("/update-product", (req, res, next) => {

  var filterQuery_item = {'itemId': req.body.pID_edit};
  var updateQuery_item = {
    itemcategory: req.body.pCategory_edit,
    itemname: req.body.pName_edit,
    itemPrice: req.body.pPrice_edit,
    Stock: req.body.pStock_edit
  }
  
  inventoryModel.findOneAndUpdate(filterQuery_item, updateQuery_item, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      res.redirect("back");
  });

});


app.post("/delete-product", (req, res, next) => {

  var deleteQuery = {'itemId': req.body.pid};

  inventoryModel.findOneAndDelete(deleteQuery, function(err){
    if (err) {
      console.log("There is an error while deleting: " + err);
      return res.send(500, {error: err});
    } else {
      console.log("Successfully Deleted");
      let redir = { redirect: "/inventory"}
      return res.json(redir);
      }
  })
});

app.post("/insert-staff", (req, res, next) => {
  console.log(req.body.eDOB);

  let newEmployee = new employeeModel({
    empID: req.body.eID,
    firstName: req.body.fName,
    lastName: req.body.lName,
    DOB: req.body.eDOB,
    position: req.body.ePosition
    });

  newEmployee.save();

  res.redirect("back");
});


app.post("/update-staff", (req, res, next) => {

  var filterQuery_staff = {'empID': req.body.eID_edit};
  var updateQuery_staff = {
    firstName: req.body.fName_edit,
    lastName: req.body.lName_edit,
    DOB: req.body.eDOB_edit,
    position: req.body.ePosition_edit
  }
  
  employeeModel.findOneAndUpdate(filterQuery_staff, updateQuery_staff, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      res.redirect("back");
  }); 

});

app.post("/delete-staff", (req, res, next) => {

  var deleteQuery = {'empID': req.body.eid};

  employeeModel.findOneAndDelete(deleteQuery, function(err){
    if (err) {
      console.log("There is an error while deleting: " + err);
      return res.send(500, {error: err});
    } else {
      console.log("Successfully Deleted");
      let redir = { redirect: "/staffs"}
      return res.json(redir);
      }
  }).srot;
});


app.post("/category", async (req, res) => {
  //get data from category page and save it into database
  //deduct the quantity of inventory after sold
  const {cartItems} = req.body;
  // await cartItems.array.forEach(element => {
  //   return inventoryModel.updateMany({itemname: element},{$inc: {Stock: -1}},{ multi: true}, function(err,res){
  //   if(err){
  //     console.error(err.toString());
  //   } else {
  //     console.log("data successfully updated!")
  //     res.redirect('/MainMenu');
  //   }
  // })
  // });
  const cartItemsLength = Object.keys(cartItems).length;
  for( let i = 0; i < cartItemsLength; i++){
    let response = await inventoryModel.updateOne(
    {itemname: cartItems[i]},
    {$inc: {Stock: -1,itemSold: 1}});
    // console.log(response);
  }

  let redir = { redirect: "/mainMenu"}
  return res.json(redir);
  
  // res.sendFile(__dirname + '/MainMenu.html');
  // window.location.assign('/MainMenu')
});

app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});
