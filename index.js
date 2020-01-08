const express = require('express');
const bodyParser = require('body-parser');
const employeeService = require("./employeeService.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));








app.get('/api/employees', (req, res) => {
  res.status(200).send(employeeService.getEmployees());
});




app.get('/api/employees/:id', (req, res) => {
  var x = employeeService.getEmployee(parseInt(req.params.id));
  if(x)
  {
  res.status(200).send(x);
  }
  else
  {
  res.status(500).send("Employee not found");
  }
  
});





app.put("/api/employees/:id", function(req, res) {
  if(req.body.name && req.body.email) {
    var id = parseInt(req.params.id);
    var x = employeeService.updateEmployee(id, req.body);
    res.status(200).send(x);
  }
  else {
    res.status(500).send("Name or email cannot be blank");
  }
});







app.delete("/api/employees/:id", function(req, res) {
  var id = parseInt(req.params.id);
  var x = employeeService.deleteEmployee(id);
   if(x) {
    res.status(200).send(x);
  }
  else {
    res.status(500).send("Employee not found");

  
  };
});





app.post("/api/employees", function(req, res) {
  var postEmployee = employeeService.addEmployee(req.body)
  if(postEmployee){
    res.status(200).send(postEmployee);
  }
  else
  {
    res.status(500).send("No information on employee. Put in something!");
  }
});




app.delete("/api/employees", function(req, res) {

  var deleteAll = employeeService.deleteAllEmployees();

  res.status(200).send(deleteAll);

});





app.listen(3003, () => console.log('server started'));