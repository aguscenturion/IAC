import express from "express";
import { connect } from "mongoose";
import mysql from "mysql2";

const app = express();

app.get("/check-mongodb", (_req, res) => {
  connect(`mongodb://${process.env.MONGO_DB_HOST}:27017`)
    .then(() => {
      res.send("connected");
    })
    .catch((err) => {
      console.log(err);
      res.send("not connected");
    });
});

// app.get("/check-mysql", (_req, res) => {
//   const connection = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//   });

//   const query = connection.query("SELECT 1;");

//   if (query) {
//     return res.send("connected");
//   }

//   res.send("not connected");
// });

app.get("/check-mariadb", (_req, res) => {
  try {
    const connection = mysql.createConnection({
      host: "mymariadb",
      user: "root",
      password: "root",
    });

    const query = connection.query("SELECT 1;");
    console.log(query);
    if (query) {
      res.send("connected");
    }
    connection.end();
  } catch (error) {
    console.log(error);
    res.send("not connected");
    connection.end();
  }
});

app.listen(4000, () => {
  console.log("server running");
});
