const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/empDB", {
  useNewUrlParser: true,
});

const empSchema = mongoose.Schema({
  empID: { type: String, required: true, unique: true }, 
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  DOB: { type: Date, required: true },
  // address: { type: String, required: true },
  position: {type: String, required: true},
  SSN: { type: Number, required: false, null: true},
  password: {type: String, required: true}
});

const empItem = mongoose.model("empItem", empSchema);

const admin = new empItem({
    empID: "300330001",
    firstName: "Nelson",
    lastName: "Eng",
    DOB: 01/01/1999,
    position: "Manager",
    SSN: 900000001,
    password: "1111"
  });
const employee1 = new empItem({
    empID: "300335548",
    firstName: "Joling",
    lastName: "Weng",
    DOB: 01/01/1999,
    position: "Cashier",
    SSN: 900000002,
    password: "2222"
  });
const employee2 = new empItem({
    empID: "300323120",
    firstName: "Sulgi",
    lastName: "Kim",
    DOB: 01/01/1999,
    position: "Cashier",
    SSN: 900000003,
    password:"3333"
  });
const employee3 = new empItem({
    empID: "300342244",
    firstName: "Tashmeet",
    lastName: "Singh",
    DOB: 01/01/1999,
    position: "Cashier",
    SSN: 900000004,
    password: "4444"
  });
const employee4 = new empItem({
    empID: "300329987",
    firstName: "Samdeep",
    lastName: "Singh",
    DOB: 01/01/1999,
    position: "Cashier",
    SSN: 900000005,
    password:"5555"
  });

  empItem.deleteMany({})
  .then(function(){
    console.log("Data deleted"); // Success
  }).catch(function(error){
    console.log(error); // Failure
  });
  
  
  
  empItem.insertMany(
    [
      admin,
      employee1,
      employee2,
      employee3,
      employee4,
    ],
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("employee db created successfully");
        mongoose.connection.close();
      }
    }
  );
  
  module.exports = empItem;
  