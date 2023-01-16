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

module.exports = {
  getTodayInNotionFormat,
};
