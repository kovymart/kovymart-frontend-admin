import { useEffect, useState } from "react"
import "./Home.style.css"
import { useSelector, useDispatch } from "react-redux"
import { AppState } from "../../stores"
import {
	Table,
	Menu,
	Dropdown,
	Spin,
	Button,
	Skeleton,
	BackTop,
	Typography,
	Card,
} from "antd"
import {
	DownOutlined,
	LoadingOutlined,
	UpCircleOutlined,
} from "@ant-design/icons"
import StatusPlace from "./StatusPlace.component"
import ModalAssign from "./ModalAssign.component"
import ModalDelete from "./ModalDelete.component"
import FormatDate from "../../helpers/formatDate"
import { useHistory, Link } from "react-router-dom"
import {
	houseforrent_getlist,
	houseforrent_pagination,
	houseforrent_refresh,
} from "../../stores/houseforrent.slice"

const { Text } = Typography
const { Column } = Table

const TableData = () => {
	const dispatch = useDispatch()
	const history = useHistory()

	const requesting = useSelector((state: AppState) => state.house.requesting)
	const houseforrent_list: Array<any> = useSelector(
		(state: AppState) => state.house.list
	)
	const pagination = useSelector((state: AppState) => state.house.pagination)

	const [visibleAssign, setVisibleAssign] = useState(false)
	const [visibleDelete, setVisibleDelete] = useState(false)
	const [houseForRentIDSelected, setHouseForRentIDSelected] = useState<
		number | undefined
	>()
	//Custom spin loading

	// Handle dropdown: assgin, delete,...
	const menu = (HouseForRentID: number) => (
		<Menu onClick={(e) => handleMenuClick(e, HouseForRentID)}>
			<Menu.Item key="assignMenu">Phân công</Menu.Item>
			<Menu.Item key="editMenu">
				<Link to={`/update/${HouseForRentID}`}>
					Sửa
				</Link>
			</Menu.Item>
			<Menu.Item key="deleteMenu">Xóa</Menu.Item>
		</Menu>
	)
	function handleMenuClick(e: any, HouseForRentID: number) {
		switch (e.key) {
			case "assignMenu":
				setHouseForRentIDSelected(undefined)
				setVisibleAssign(true)
				setHouseForRentIDSelected(HouseForRentID)
				break
			case "deleteMenu":
				setVisibleDelete(true)
				setHouseForRentIDSelected(HouseForRentID)
				break
			default:
				break
		}
	}
	useEffect(() => { //refresh data when back to homepage
		if (pagination.offset >= 0) {
			dispatch(houseforrent_refresh(pagination))
		}
	}, [])
	//Handle pagination
	const [requestLoadmore, setRequestLoadmore] = useState(false)
	useEffect(() => {
		if (pagination.offset > 0 && requestLoadmore === true) {
			const params = pagination
			const loadmore = requestLoadmore
			let data = { params, loadmore }
			dispatch(houseforrent_getlist(data))
			setRequestLoadmore(false)
		}
	}, [pagination]) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (requestLoadmore === true) dispatch(houseforrent_pagination())
	}, [requestLoadmore]) // eslint-disable-line react-hooks/exhaustive-deps

	const handleLoadmore = () => {
		setRequestLoadmore(true)
	}

	return (
		<Card
			className="border-small shadow-small margin-top-4"
			style={{ borderRadius: "0.25rem" }}
		>
			<ModalAssign
				visibleAssign={visibleAssign}
				setVisibleAssign={setVisibleAssign}
				houseForRentIDSelected={houseForRentIDSelected}
				setHouseForRentIDSelected={setHouseForRentIDSelected}
			/>
			<ModalDelete
				visibleDelete={visibleDelete}
				setVisibleDelete={setVisibleDelete}
				houseForRentIDSelected={houseForRentIDSelected}
				setHouseForRentIDSelected={setHouseForRentIDSelected}
			/>
			<Table
				dataSource={houseforrent_list.map((house) => ({
					...house,
					key: house.HouseForRentID,
				}))}
				scroll={{ x: 980 }}
				pagination={false}
				locale={{
					emptyText: houseforrent_list ? <Skeleton /> : "",
				}}
			>
				{houseforrent_list.length > 0 ? (
					<div>
						<Column
							title={<Text strong>STT</Text>}
							dataIndex="index"
							key="index"
							render={(value, item, index) => 1 + index}
						/>
						<Column
							title={<Text strong>Chủ nhà</Text>}
							dataIndex="LandOwnerName"
							render={(text, record: any) => (
								<Link to={`/detail/${record.HouseForRentID}`}>
									<Text className="text-link-direction">
										{record.HouseForRentID} -{record.LandOwnerName}
									</Text>
								</Link>
							)}
						/>
						<Column
							title={<Text strong>Thông tin liên hệ</Text>}
							dataIndex="contact"
							render={(text, record: any) => (
								<>
									<Text strong>SĐT: </Text>
									<Text> {record.Phone}</Text>
									<br />
									<Text strong>Email: </Text>
									<Text> {record.Email}</Text>
								</>
							)}
						/>
						<Column
							className="responsive-column"
							title={<Text strong>Thông tin mặt bằng</Text>}
							dataIndex="place"
							render={(text, record: any) => (
								<>
									<Text strong>Địa chỉ: </Text>
									<br />
									<Link to={`/detail/${record.HouseForRentID}`}>
										<Text className="text-link-direction">
											{record.Address ? record.Address : ""}
											{record.WardName ? <>, {record.WardName}</> : ""}
											{record.DistrictName ? <>, {record.DistrictName}</> : ""}
											{record.ProvinceName ? <>, {record.ProvinceName}</> : ""}
										</Text>
									</Link>
								</>
							)}
						/>
						<Column
							title={<Text strong>Thông tin tiếp nhận</Text>}
							dataIndex="assign"
							render={(text, record: any) => (
								<>
									<Text strong>Người tạo: </Text>
									{record.CreatedUser ? (
										<Text>{record.CreatedUser} - </Text>
									) : null}
									{record.CreatedFullname
										? record.CreatedFullname
										: "Chủ nhà tạo"}
									<br />
									<Text strong>Người tiếp nhận: </Text>
									{record.AssignUser ? <Text>{record.AssignUser} - </Text> : ""}
									{record.AssignFullName ? record.AssignFullName : ""}
									<br />
									<Text strong>Ngày tiếp nhận: </Text>
									{record.AssignDate ? (
										<FormatDate date={record.AssignDate} />
									) : null}
								</>
							)}
						/>
						<Column
							title={<Text strong>Trạng thái</Text>}
							dataIndex="Status"
							render={(text, record: any) => (
								<>
									<StatusPlace status={record.Status} />
									<br></br>
									<Dropdown overlay={menu(record.HouseForRentID)}>
										<Button>
											Tùy chọn
											<DownOutlined />
										</Button>
									</Dropdown>
								</>
							)}
						/>
					</div>
				) : null}
			</Table>
			<div className="align-center margin-top-4">
				{requesting ? (
					<Spin
						indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
						style={{ margin: "20px 0" }}
					/>
				) : null}

				{!requesting && houseforrent_list.length > 0 ? (
					<Button onClick={handleLoadmore}>Xem thêm</Button>
				) : null}
			</div>
			<BackTop style={{ right: "5%" }}>
				<div
					className="float-end"
					style={{ fontSize: "1.8rem", color: "#6c757d" }}
				>
					<UpCircleOutlined />
				</div>
			</BackTop>
		</Card>
	)
}

export default TableData
