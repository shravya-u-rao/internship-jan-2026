import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rollno: { type: Number, required: true },
  teacher_id: { type: String, required: false },
  image: { type: String, required: false },
  isactive: { type: Number, default: 1 },
});

export default mongoose.model("students", studentSchema);
