const express = require("express");
const app = express();
var cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const port = 5000;

//Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x2jda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Database Conntected");
    const database = client.db("be-bike");
    const productCollection = database.collection("product");
    const usersCollection = database.collection("users");

    // app.get("/appointment", async (req, res) => {
    //   const email = req.query.email;
    //   const date = new Date(req.query.date).toLocaleDateString();
    //   const query = { email: email, date: date }; //jaita diye find korbo saita dite hobe akahne email diye korse

    //   const cursor = appointmentCollection.find(query);
    //   const appointment = await cursor.toArray();
    //   res.send(appointment);
    // });
    // app.post("/appointment", async (req, res) => {
    //   const appointment = req.body;
    //   const result = await appointmentCollection.insertOne(appointment);
    //   res.json(result);
    // });

    //Add Product API

    app.post("/products", async (req, res) => {
      const products = req.body;
      const result = await productCollection.insertOne(products);
      res.json(result);
    });

    //Get Product API

    app.get("/products", async (req, res) => {
      const cursor = productCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    //Add User Database API

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.json(result);
    });

    // app.put("/users", async (req, res) => {
    //   const user = req.body;
    //   const filter = { email: user.email };
    //   const options = { upsert: true };
    //   const updateDoc = { $set: user };
    //   const result = await usersCollection.updateOne(
    //     filter,
    //     updateDoc,
    //     options
    //   );
    //   res.json(result);
    // });

    //Set Admin Role API

    app.put("/users/admin", async (req, res) => {
      const user = req.body;
      console.log(user);
      const filter = { email: user.email };
      const updateDoc = { $set: { role: "admin" } };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.json(result);
    });

    //Get Admin Role API

    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      let isAdmin = false;
      if (user?.role === "admin") {
        isAdmin = true;
      }
      res.json({ admin: isAdmin });
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Doctor Portal");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
