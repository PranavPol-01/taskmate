import Notification from "../models/notification.js";
import Task from "../models/task.js";

export const createNotification = async (req, res) => {
  try {
    const { taskId } = req.body;
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const reminderTime = new Date(task.end_time);
    reminderTime.setHours(reminderTime.getHours() - 1); 

    const newNotification = new Notification({
      task: taskId,
      reminder_time: reminderTime
    });

    await newNotification.save();
    res.status(201).json({ message: 'Notification created successfully', notification: newNotification });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).populate('task');
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default { createNotification, getNotifications, deleteNotification };
