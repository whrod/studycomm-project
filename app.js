require('dotenv').config();

const express = require('express');
const PORT = process.env.Port || 8001;

const app = express();

const {
  getListTodoWriters,
  getTeamMembers,
  getTodayPenaltyList,
} = require('./services/notion.js');

app.get('/study', async (req, res) => {
  const todoWriters = await getListTodoWriters();
  res.json(todoWriters);
});

app.get('/members', async (req, res) => {
  const teamMembers = await getTeamMembers();
  res.json(teamMembers);
});

app.get('/penalty', async (req, res) => {
  const todayPenaltyList = await getTodayPenaltyList();
  res.json(todayPenaltyList);
});
//TODO: Express 활용 라우터 만들기, 타임스케줄 활용 알림메시지 보내기, MessengerR 봇 연결

// (async () => {
//   const todoWriters = await getListTodoWriters();
//   console.log(todoWriters, '--ToDoWriters--');

//   const teamMembers = await getTeamMembers();
//   console.log(teamMembers, '--TeamMembers--');

//   const todayPenaltyList = await getTodayPenaltyList(todoWriters, teamMembers);
//   console.log(todayPenaltyList, '--PenaltyList--');
// })();

app.listen(PORT, console.log(`Listening to request on Port:${PORT}`));
