const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const todos = [
  { todo: "wake up", isCompleted: false },
  { todo: "Eat Breakfast", isCompleted: false },
];

app.get("/todos", (req, res) => {
  res.status(200);
  res.json(todos);
});

app.post("/create/todo", (req, res) => {
  const todo = req.body.todo;
  const isCompleted = req.body.isCompleted;
  const newTodos = { todo, isCompleted };
  todos.push(newTodos);
  res.status(201);
  res.json(newTodos);
});

app.put("/update/todo/:name", (req, res) => {
  const name = req.params.name;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].todo === name) {
      todos[i].todo = req.body.todo;
      res.status(200);
      res.json(todos[i]);
      return;
    }
  }

  res.status(404);
  res.json("name  not found");
});

app.delete("/delete/todo/:name", (req, res) => {
  const name = req.params.name;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].todo === name) {
      res.status(200);
      //todos.splice(i,1);
      res.json(todos.splice(i, 1)[0]);
      return;
    }
  }
  res.status(404);
  res.json("name not found");
});

app.put("/complete/todo/:name", (req, res) => {
  const name = req.params.name;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].todo === name) {
      todos[i].isCompleted = true;
      res.status(200);
      res.json(todos);
      return;
    }
  }
  res.status(404);
  res.json("name not found");
});


app.get(("/completed/todos"),(req,res)=> {
    const found = todos.filter((element,index) =>{
        return element.isCompleted === true
    })

    if (found.length!=0){
        res.status(200);
        res.json(found);
    }else
    res.status(404);
    res.json("todos name not found");
})

////
app.listen(port, () => {
  console.log(`practice app listening at http://localhost:${port}`);
});
