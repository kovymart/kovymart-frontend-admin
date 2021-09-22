import { Tag } from 'antd';

function Status(props: any) {
  let result: string = '';
  let color: string = 'cyan';

  switch (props.status) {
    case 1:
      result = 'Chờ duyệt';
      color = 'cyan';
      break;
    case 2:
      result = 'Đã duyệt';
      color = 'cyan';
      break;
    case 3:
      result = 'Đang đóng gói';
      color = 'cyan';
      break;
    case 4:
      result = 'Đang vận chuyển';
      color = 'cyan';
      break;
    case 5:
      result = 'Hoàn thành';
      color = 'green';
      break;
    case 6:
      result = 'Đã hủy';
      color = 'magenta';
      break;
    default:
      result = '';
      color = 'cyan';
      break;
  }
  return (
    <>
      <Tag color={color}>{result}</Tag>
    </>
  );
};


export default Status;