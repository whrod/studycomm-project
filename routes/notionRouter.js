const notionRouter = require('express').Router();
const notionService = require('../services/notionService');

notionRouter.get('/todo-list', async (req, res) => {
  const todoWriters = await notionService.getListTodoWriters();
  res.json(todoWriters);
});

notionRouter.get('/members', async (req, res) => {
  const teamMembers = await notionService.getTeamMembers();
  res.json(teamMembers);
});

notionRouter.get('/penalty', async (req, res) => {
  const todayPenaltyList = await notionService.getTodayPenaltyList();
  res.json(todayPenaltyList);
});

module.exports = notionRouter;
