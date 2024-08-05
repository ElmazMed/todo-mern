const Task = require("../models/TaskSchema");

const asyncHandler = require("express-async-handler");

const getTasks = asyncHandler(async (req, res) => {
  const getTask = await Task.find();

  res.status(200).send(getTask);
});

const createTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a task!");
  }
  const addTask = await Task.create({ text: req.body.text });
  res.status(200).json(addTask);
});

const updateTask = asyncHandler(async (req, res) => {
  const update = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ update, id: req.params.id });
});

const deleteTask = asyncHandler(async (req, res) => {
  const deleteTask = await Task.findByIdAndDelete(req.params.id);
  if (!deleteTask) {
    res.status(404);
    throw new Error("Task not found!");
  }
  res.status(200).json({ id: req.params.id });
});

module.exports = { getTasks, createTask, updateTask, deleteTask };
