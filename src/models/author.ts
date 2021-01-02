import mongoose from "mongoose";

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number,
});

const model = mongoose.model("Author", authorSchema);

export default model;
