const express = require("express");
const app = express();
var cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const port = 5000;

//Middleware
app.use(cors());
app.use(express.json());

// doctor - portal - firebase - adminsdk.json;

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x2jda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// const client = new MongoClient(uri);
// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("doctor-portal");
//     const appointmentCollection = database.collection("appoinment");
//     const usersCollection = database.collection("users");

//     // app.get("/appointment", async (req, res) => {
//     //   const email = req.query.email;
//     //   const date = new Date(req.query.date).toLocaleDateString();
//     //   const query = { email: email, date: date }; //jaita diye find korbo saita dite hobe akahne email diye korse

//     //   const cursor = appointmentCollection.find(query);
//     //   const appointment = await cursor.toArray();
//     //   res.send(appointment);
//     // });
//     // app.post("/appointment", async (req, res) => {
//     //   const appointment = req.body;
//     //   const result = await appointmentCollection.insertOne(appointment);
//     //   res.json(result);
//     // });

//     // app.post("/users", async (req, res) => {
//     //   const user = req.body;
//     //   const result = await usersCollection.insertOne(user);
//     //   res.json(result);
//     // });

//     // app.put("/users", async (req, res) => {
//     //   const user = req.body;
//     //   const filter = { email: user.email };
//     //   const options = { upsert: true };
//     //   const updateDoc = { $set: user };
//     //   const result = await usersCollection.updateOne(
//     //     filter,
//     //     updateDoc,
//     //     options
//     //   );
//     //   res.json(result);
//     // });

//     // app.put("/users/admin", verifyToken, async (req, res) => {
//     //   const token = req.headers.authorization;
//     //   console.log(token);
//     //   const user = req.body;
//     //   const filter = { email: user.email };
//     //   const updateDoc = { $set: { role: "admin" } };
//     //   const result = await usersCollection.updateOne(filter, updateDoc);
//     //   res.json(result);
//     // });

//     // app.get("/users/:email", async (req, res) => {
//     //   const email = req.params.email;
//     //   const query = { email: email };
//     //   const user = await usersCollection.findOne(query);
//     //   let isAdmin = false;
//     //   if (user?.role === "admin") {
//     //     isAdmin = true;
//     //   }
//     //   res.json({ admin: isAdmin });
//     // });
//   } finally {
//     // await client.close();
//   }
// }
// run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Doctor Portal");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
