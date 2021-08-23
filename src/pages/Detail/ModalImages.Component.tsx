import { Modal, Image } from "antd";
export const ModalImages = (props: any) => {
  return (
    <Modal
      title={
        <div style={{ textAlign: "center" }}>
          <span style={{ color: "#ff6600", fontSize: "25px" }}>
            Danh sách hình ảnh
          </span>
        </div>
      }
      centered
      visible={props.visible}
      onCancel={props.onCancel}
      onOk={props.onOk}
      width={1000}
      className="scroll-image"
    >
      <div style={{ textAlign: "center" }}>
        <Image.PreviewGroup>{props.showImages}</Image.PreviewGroup>
      </div>
    </Modal>
  );
};
