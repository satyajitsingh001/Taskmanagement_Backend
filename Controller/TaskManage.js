import Task from "../Model/TaskModel.js";

export const createTask = async (req, res) => {
  try {
    // Validate input
    const { taskName, taskDetails, status } = req.body;
    if (!taskName || !taskDetails) {
      return res
        .status(400)
        .json({ message: "Task name and details are required." });
    }

    const validStatuses = ["pending", "inprogress", "complete"]; // Define valid statuses
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    // Create new task
    const newTask = await Task.create({
      taskName,
      taskDetails,
      status: status || "pending", // Set default status if not provided
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskName, taskDetails, status } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update task details
    task.taskName = taskName || task.taskName;
    task.taskDetails = taskDetails || task.taskDetails;
    task.status = status || task.status; // Update status

    // Save updated task to the database
    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskStatusCounts = async (req, res) => {
  try {
    // Count tasks by each status
    const pendingCount = await Task.countDocuments({ status: "pending" });
    const inProgressCount = await Task.countDocuments({ status: "inprogress" });
    const completeCount = await Task.countDocuments({ status: "complete" });

    // Total task count
    const totalCount = await Task.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Task status counts retrieved successfully",
      data: {
        total: totalCount,
        pending: pendingCount,
        inprogress: inProgressCount,
        complete: completeCount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
