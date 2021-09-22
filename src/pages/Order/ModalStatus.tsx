import { useDispatch } from 'react-redux';
import { Modal, Select } from 'antd';
import ButtonUI from '../../components/UIKit/ButtonUI';
import { updateOrderStatus } from '../../stores/order.slice';
function ModalStatus(props: any) {
  const dispatch = useDispatch();
  const { Option } = Select;
  const HideModal = () => {
    props.setVisibility(false);
  };

  const handleSelect = (e: string) => {
    const data = {
      id: props.id,
      status: parseInt(e)
    };
    if (data.id > 0) {
      dispatch(updateOrderStatus(data));
    }
  };

  return (
    <Modal
      title="Thay đổi trạng thái đơn hàng"
      visible={props.visible}
      onOk={HideModal}
      onCancel={HideModal}
      footer={[
        <ButtonUI text="Xác nhận" key="submit" onClick={HideModal} />
      ]}
    >
      <Select style={{ width: '17rem' }} onChange={handleSelect}>
        <Option value="1">Chờ duyệt</Option>
        <Option value="2">Đã duyệt</Option>
        <Option value="3">Đang đóng gói</Option>
        <Option value="4">Đang vận chuyển</Option>
        <Option value="5">Hoàn thành</Option>
        <Option value="6">Đã hủy</Option>
      </Select>
    </Modal>
  );
}

export default ModalStatus;