import React from 'react';

interface IProps {
  date?: any,
}
const FormatDate: React.FC<IProps> = ({ date }) => {
  var data: Date = new Date(date);
  var day = data.getDate() + "";
  var month = (data.getMonth() + 1) + "";
  var year = data.getFullYear() + "";

  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);

  function checkZero(data: any) {
    if (data.length === 1) {
      data = "0" + data;
    }
    return data;
  }
  return (
    <>
      {day}-{month}-{year}
    </>
  );
};

export default FormatDate;