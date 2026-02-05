import mongoose from "mongoose";
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isactive: { type: Number, default: 1 },
});

export default mongoose.model("teachers", teacherSchema);
