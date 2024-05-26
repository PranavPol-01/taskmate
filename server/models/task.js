import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  start_time: {
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['missed', 'completed', 'deleted', 'in progress'],
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  reminderSent: { type: Boolean, default: false },
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
