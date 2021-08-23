import { useEffect, useState } from "react"
import {
	 Select, Form, Input, Col, Row, Card, Space, Typography, Menu, Dropdown
} from "antd"
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux"
import { houseforrent_getlist } from "../../stores/houseforrent.slice"
import { AppState } from "../../stores"
import {
	getprovinces,
	getdistricts,
	getroadaxises,
	selectListProvinces,
	selectListDistricts,
	selectListRoads,
} from "../../stores/location.slice"
import { useHistory } from "react-router-dom"
import { channels, areas, status_list } from "./Home.data"
import ButtonUI from "../../components/UIKit/ButtonUI"
const { Option } = Select
const { Title, Text } = Typography

interface IProps {
	handlePrint: any,
}
const SearchEngine: React.FC<IProps> = ({
	handlePrint
}) => {
	// const SearchEngine = () => {
	const houseforrent_list: Array<any> = useSelector(
		(state: AppState) => state.house.list
	)

	const [form] = Form.useForm()
	const dispatch = useDispatch()
	const [state, setState] = useState({
		//OnChange Form
		districtDisable: true,
		roadDisable: true,
		provinceId: null,
	})

	const provinces = useSelector(selectListProvinces)
	const roadaxises = useSelector(selectListRoads)
	const districts = useSelector((store: AppState) =>
		selectListDistricts(store, state.provinceId)
	)

	useEffect(() => {
		dispatch(getprovinces())
		dispatch(getdistricts(-1))
	}, [])

	// handle search field
	const getID = (value: string) => {
		return value ? JSON.parse(value)[0] : -1
	}
	const history = useHistory()
	const onClickAdd = () => {
		history.push("/add")
	}

	const searchActions = (e: any, Offset: number, Pagesize: number) => {
		let data = {
			params: {
				search: e.SearchField ? e.SearchField : "",
				provinceid: getID(e.ProvinceID),
				districtid: getID(e.DistrictID),
				wardid: -1,
				roadaxisid: getID(e.RoadAxisID),
				username: "",
				offset: Offset ? Offset : 0,
				pagesize: Pagesize ? Pagesize : 9,
			},
			loadmore: false,
		}
		dispatch(houseforrent_getlist(data))
	}
	const handleSubmit = (e: any) => {
		searchActions(e, 0, 9)
	}
	const handleProvince = (value: string) => {
		setState({
			provinceId: JSON.parse(value)[0],
			districtDisable: false,
			roadDisable: true,
		})
		form.setFieldsValue({
			DistrictID: null,
			RoadAxisID: null,
		})
	}

	const handleDistrict = (value: string) => {
		let provinceid = JSON.parse(form.getFieldsValue().ProvinceID)[0]
		let params = {
			search: "",
			provinceid: provinceid,
			districid: JSON.parse(value)[0],
			username: "",
			offset: 0,
			pagesize: 10,
		}
		dispatch(getroadaxises(params))
		setState((preState) => {
			return {
				...preState,
				roadDisable: false,
			}
		})
		form.setFieldsValue({
			RoadAxisID: null,
		})
	}

	return (
		<Card
			className="border-small shadow-small"
			style={{ borderRadius: "0.25rem" }}
		>
			<Form name="searchEngine" onFinish={handleSubmit} form={form}>
				{/* First row */}
				<Row gutter={16}>
					<Col md={12} lg={8} span={24}>
						<Title level={5}>Kênh</Title>
						<Form.Item name="ChannelID">
							<Select showSearch placeholder="- Chọn kênh">
								{channels.map((prov: any) => (
									<Option
										key={prov.ChannelID}
										value={JSON.stringify([prov.ChannelID, prov.ChannelName])}
									>
										{prov.ChannelName}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col md={12} lg={8} span={24}>
						<Title level={5}>Khu vực</Title>
						<Form.Item name="AreaID">
							<Select showSearch placeholder="- Chọn khu vực">
								{areas.map((prov: any) => (
									<Option
										key={prov.AreaID}
										value={JSON.stringify([prov.AreaID, prov.AreaName])}
									>
										{prov.AreaName}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col md={12} lg={8} span={24}>
						<Title level={5}>Tỉnh/ Thành phố</Title>
						<Form.Item name="ProvinceID">
							<Select showSearch placeholder="" onSelect={handleProvince}>
								{provinces.map((prov: any) => (
									<Option
										key={prov.ProvinceID}
										value={JSON.stringify([prov.ProvinceID, prov.ProvinceName])}
									>
										{prov.ProvinceName}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
				</Row>

				{/* Second row */}
				<Row gutter={16}>
					<Col sm={24} md={12} lg={8} span={24}>
						<Title level={5}>Quận/ huyện</Title>
						<Form.Item name="DistrictID">
							<Select
								showSearch
								placeholder="- Chọn quận/ huyện"
								onSelect={handleDistrict}
								disabled={state.districtDisable}
							>
								{districts.map((prov: any) => (
									<Option
										key={prov.DistrictID}
										value={JSON.stringify([prov.DistrictID, prov.DistrictName])}
									>
										{prov.DistrictName}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col md={12} lg={8} span={24}>
						<Title level={5}>Trục đường</Title>
						<Form.Item name="RoadAxisID">
							<Select
								showSearch
								placeholder="- Chọn trục đường"
								// onSelect={handleRoadAxis}
								disabled={state.roadDisable}
							>
								{roadaxises.map((prov: any) => (
									<Option
										key={prov.RoadAxisID}
										value={JSON.stringify([prov.RoadAxisID, prov.RoadAxisName])}
									>
										{prov.RoadAxisName}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
				</Row>

				{/* Third row */}
				<Row gutter={16}>
					<Col md={12} lg={8} span={24}>
						<Title level={5}>Trạng thái</Title>
						<Form.Item name="StatusID">
							<Select showSearch placeholder="- Chọn trạng thái">
								{status_list.map((prov: any) => (
									<Option
										key={prov.StatusID}
										value={JSON.stringify([prov.StatusID, prov.StatusName])}
									>
										{prov.StatusName}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col md={12} lg={8} span={24}>
						<Title level={5}>Nhập thông tin cần tìm *</Title>
						<Form.Item name="SearchField">
							<Input />
						</Form.Item>
					</Col>
					<Col
						className="align-center"
						xl={8}
						span={24}
						style={{ marginTop: "2.3em" }}
					>
						<Space size={10}>
							<ButtonUI
								text="Tìm"
								style={{ width: "7em" }}
								type="primary"
								htmlType="submit"
								withIcon={<SearchOutlined />}
							/>
							<ButtonUI
								text="Thêm"
								onClick={onClickAdd}
								withIcon={<PlusOutlined />}
							/>
							{/* <Button >
									<FileTextOutlined />Xuất file
								</Button> */}
						</Space>
					</Col>
				</Row>
			</Form>
		</Card>
	)
}

export default SearchEngine
