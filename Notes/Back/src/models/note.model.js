import mongoose from "mongoose";
const {Schema, model}= mongoose

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "el campo title es requerido"],
    },
    title: {
      type: String,
      required: [true, "el campo title es requerido"],
    },
  },
  { timetamps: true }
);

export const noteModel=model("note", noteSchema);
