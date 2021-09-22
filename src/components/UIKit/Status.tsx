import { Tag } from 'antd';

function Status(props: any) {
  return (
    <>
      {props.status === 1
        ? <Tag color="green"> Đã thanh toán </Tag>
        : <Tag color="red">Chưa thanh toán</Tag>
      }
    </>
  );
}

export default Status;