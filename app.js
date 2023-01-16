require('dotenv').config();

const express = require('express');
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID;

const getTeamMembers = async () => {
  const response = await notion.databases.retrieve({
    database_id: database_id,
  });

  teamMembers = [];
  for (const element of response.properties['태그'].multi_select.options) {
    teamMembers.push(element.name);
  }
  return teamMembers;
};

(async () => {
  const teamMembers = await getTeamMembers();
  console.log(teamMembers);
})();

const getTodayInNotionFormat = () => {
  //yyyy-mm-dd 포맷 날짜 생성
  let today = new Date();
  return (
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1 > 9
      ? (today.getMonth() + 1).toString()
      : '0' + (today.getMonth() + 1)) +
    '-' +
    (today.getDate() > 9
      ? today.getDate().toString()
      : '0' + today.getDate().toString())
  );
};

const today = getTodayInNotionFormat();

const getList = async () => {
  const payload = {
    path: `databases/${database_id}/query`,
    method: 'POST',
  };

  const { results } = await notion.request(payload);

  const getListOfTodayTodoWriters = results
    .filter((page) => today === page.properties['날짜'].date.start)
    .map((page) => {
      const name = page.properties['이름'].title[0].text.content;
      const link = page.url;
      const listTodayWriters = {};
      listTodayWriters[name] = link;

      return listTodayWriters;
    });

  return getListOfTodayTodoWriters;
};

(async () => {
  const todoWriters = await getList();
  console.log(todoWriters);
})();

//TODO: Express 활용 라우터 만들기, 타임스케줄 활용 알림메시지 보내기, MessengerR 봇 연결
