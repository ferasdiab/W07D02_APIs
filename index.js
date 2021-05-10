const express = require("express");
const app = express();
const port = 3000;

// a middleware that enables us to read the received JSON data
app.use(express.json());

const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 20 },
  { name: "Mark", age: 19 },
];

// a GET request on endpoint http://localhost:3000/users
app.get("/users", (req, res) => {
  // set the response status code to 200 (OK)
  res.status(200);
  // sends back a response of all users
  res.json(users);
});

// a GET request on endpoint http://localhost:3000/user?name=John
app.get("/user/:name", (req, res) => {
// query parameters way: "/user?name=John"
  // the received route parameters are in req.params
  const user = req.params.name
  // query parameters way: req.query.name

  const found = users.find((element) => {
    return element.name === user;
  });

  if (found) {
    // set the response status code to 200 (OK)
    // sends back a response of the found user
    res.status(200);
    res.json(found);
  } else {
    // set the response status code to 404 (Not Found)
    res.status(404);
    res.json("User not found");
  }
});

// a POST request on endpoint http://localhost:3000/create/user
app.post("/create/user", (req, res) => {
  // the received information are in req.body
  // an example of the sent data would be { "name": "John", "age": 25}
  const newUser = { name: req.body.name, age: eq.body.age };
  // same as the above but in ES6
  // const { name, age } = req.body;

  // add the new user to the users array
  users.push(newUser);
  // same as above but in ES6
  // users.push({ name, age });

  // set the response status code  to 201 (Created)
  res.status(201);
  // sends back a json response of the added user
  res.json(newUser);
  // same as above but in ES6
  // res.json({ name, age })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});