import { Modal, Button } from "antd";
import { useDispatch } from "react-redux";
import { houseforrent_delete } from "../../stores/houseforrent.slice";

interface IProps {
	houseForRentIDSelected: number | undefined;
	setHouseForRentIDSelected: (
		houseForRentIDSelected: number | undefined
	) => void;
	visibleDelete: boolean;
	setVisibleDelete: (visibleDelete: boolean) => void;
}
const ModalDelete: React.FC<IProps> = ({
	houseForRentIDSelected,
	setHouseForRentIDSelected,
	visibleDelete,
	setVisibleDelete,
}) => {
	const id = houseForRentIDSelected;
	const dispatch = useDispatch();

	const handleOk = () => {
		dispatch(
			houseforrent_delete({
				houseforrentid: id,
				userlogin: 10006,
			})
		);
		setVisibleDelete(false);
		setHouseForRentIDSelected(undefined);
	};

	const handleCancel = () => {
		setHouseForRentIDSelected(undefined);
		setVisibleDelete(false);
	};

	return (
		<>
			<Modal
				title={`Thông báo`}
				visible={visibleDelete}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key="back" onClick={handleCancel}>
						Quay lại
					</Button>,
					<Button key="submit" type="primary" danger onClick={handleOk}>
						Xóa
					</Button>,
				]}
			>
				<p>Bạn có chắc chắn muốn xóa ?</p>
			</Modal>
		</>
	);
};

export default ModalDelete;
