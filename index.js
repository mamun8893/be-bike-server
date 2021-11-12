const express = require("express");
const app = express();
var cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const port = process.env.PORT || 5000;

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
    const orderCollection = database.collection("orders");

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

    app.post("/bikes", async (req, res) => {
      const products = req.body;
      const result = await productCollection.insertOne(products);
      res.json(result);
    });

    //Get Product API

    app.get("/bikes", async (req, res) => {
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

    //Get Single Product API

    app.get("/bikes/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const bike = await productCollection.findOne(query);
      res.send(bike);
    });

    //Pace Order API

    app.post("/place-order", async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.send(result);
    });

    //Get My Order API

    app.get("/myOrders/:email", async (req, res) => {
      const userEmail = req.params.email;
      const myOrder = orderCollection.find({ email: userEmail });
      const result = await myOrder.toArray();
      res.json(result);
    });

    //Order Delete

    app.delete("/orderDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
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
  res.send("Be-Bike Server");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
