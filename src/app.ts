import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
import mongoose from "mongoose";
import cors from "cors"
import helper from "./helper"

const app = express();
const port = 4000;

app.use(cors())

//Create helper.ts file and add mongoDB variables
const mongooseConnectionString =
  `mongodb+srv://${helper.DB_USERNAME}:${helper.DB_PASSWORD}@cluster0.u0irn.mongodb.net/<dbname>?retryWrites=true&w=majority`;

mongoose.connect(mongooseConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Now listening for requests on port ${port}`);
});
