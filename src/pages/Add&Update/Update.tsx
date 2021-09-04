import "antd/dist/antd.css"
import "./Add&Update.styles.css"
import { Card, Form, Row, Col, Upload, Modal, Typography } from "antd"
import ButtonUI from "../../components/UIKit/ButtonUI"
import { CustomInput } from "./CustomInput.component"
import { UserOutlined, HomeOutlined, PlusOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "../../stores"
import { useState, useEffect } from "react"
import {
	getwards,
	getprovinces,
	getdistricts,
	getroadaxises,
	selectListProvinces,
	selectListDistricts,
	selectListWards,
	selectListRoads,
} from "../../stores/location.slice"
import { useHistory, useParams } from "react-router"
import {
	houseforrent_getbyid,
	houseforrent_update,
	selectHouseForRent,
	selectHouseIsRequesting,
} from "../../stores/houseforrent.slice"
import { getBase64 } from "./Add&Update.utils"
import { RouteParams } from "./Add&Update.interfaces"

const { Title } = Typography
export const Update = () => {
	const dispatch = useDispatch(),
		params = useParams<RouteParams>(),
		[form] = Form.useForm(),
		history = useHistory(),
		[state, setState] = useState({
			houseForRentId: 0,
			provinceId: 0,
			districtId: 0,
			//specific checkbox value
			checkedAtHere: false,
			//Upload & View Images
			previewVisible: false,
			previewImage: "",
			previewTitle: "",
			fileList: [] as any,
		})

	const {
		previewVisible,
		previewImage,
		fileList,
		previewTitle,
		provinceId,
		districtId,
		houseForRentId,
		checkedAtHere,
	} = state

	const houseForRent = useSelector(selectHouseForRent),
		provinces = useSelector(selectListProvinces),
		roadAxises = useSelector(selectListRoads),
		districts = useSelector((store: AppState) =>
			selectListDistricts(store, provinceId)
		),
		wards = useSelector((store: AppState) =>
			selectListWards(store, districtId)
		),
		isRequesting = useSelector(selectHouseIsRequesting)

	useEffect(() => {
		if (params.id) {
			dispatch(houseforrent_getbyid(parseInt(params.id)))
		}
		dispatch(getprovinces())
		dispatch(getdistricts(-1))
		dispatch(getwards(-1))
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (Object.keys(houseForRent).length)
			houseForRent.HouseForRentID === 0
				? history.push("/add")
				: handleFillForm()
	}, [houseForRent]) // eslint-disable-line react-hooks/exhaustive-deps

	//------------------------FORM'S EVENTS------------------------
	const handleChangeProvince = (value: number) => {
		form.setFieldsValue({
			DistrictID: undefined,
			WardID: undefined,
			RoadAxisID: undefined,
		})
		setState({
			...state,
			provinceId: value,
		})
	}

	const handleChangeDistrict = (value: number) => {
		dispatch(
			getroadaxises({
				provinceid: form.getFieldsValue().ProvinceID,
				districid: value,
				isparent: true,
			})
		)
		form.setFieldsValue({
			WardID: undefined,
			RoadAxisID: undefined,
		})
		setState({
			...state,
			districtId: value,
		})
	}

	const handleChangeAtHere = (event: any) => {
		let checked = event.target.checked
		setState({ ...state, checkedAtHere: checked })
		form.setFieldsValue({ AtHere: checked })
	}
	//------------------------END FORM'S EVENTS------------------------

	//-----------------------SELECT IMAGE EVENTS-----------------------
	const handleCancel = () => setState({ ...state, previewVisible: false })
	const handlePreview = async (file: any) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj)
		}
		setState({
			...state,
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle:
				file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
		})
	}

	const handleChangeImageFiles = ({ fileList }: any) =>
		setState({ ...state, fileList })
	//-----------------------*END SELECT IMAGE EVENTS*-----------------------

	const handleFillForm = () => {
		dispatch(
			getroadaxises({
				provinceid: houseForRent.ProvinceID,
				districid: houseForRent.DistrictID,
				isparent: true,
			})
		)
		setState({
			...state,
			houseForRentId: houseForRent.HouseForRentID,
			districtId: houseForRent.DistrictID,
			provinceId: houseForRent.ProvinceID,
			fileList: houseForRent.Images
				? houseForRent.Images.split(";").map((val: any) => ({
					uid: val,
					name: val,
					from: "https://insite.thegioididong.com/cdninsite",
					status: "done",
					url:
						"https://insite.thegioididong.com/cdninsite/HouseForRent/" + val,
				}))
				: [],
			checkedAtHere: houseForRent.AtHere,
		})

		form.setFieldsValue({
			...houseForRent,
			StatusQuo: houseForRent.StatusQuo === 0 ? null : houseForRent.StatusQuo,
		})
	}

	const handleSubmitForm = (data: any) => {
		let params = {
			insert_params: data,
			images_params: fileList,
		}
		dispatch(houseforrent_update({ ...params, id: houseForRentId }))
	}

	return (
		<div>
			<Card
				headStyle={{ backgroundColor: "#e99667" }}
				style={{ width: "100%" }}
				title={<Title level={5}
				// style={{ color: "#ff6600" }}
				>
					Chỉnh sửa thông tin mặt bằng
				</Title>}
				className="col-12"
				loading={isRequesting}
			>
				<div className="content responsive">
					<Form layout="vertical" onFinish={handleSubmitForm} form={form}>
						<div className="title-area">
							<label>
								<UserOutlined /> THÔNG TIN LIÊN HỆ:
							</label>
						</div>
						<Row gutter={16}>
							<CustomInput
								flex="1 0 50%"
								name="LandOwnerName"
								rule="required"
								label="Tên chủ nhà"
								placeholder="Nhập tên chủ nhà..."
								className="column"
							/>
							<CustomInput
								flex="1 0 25%"
								name="Phone"
								rule="required"
								label="Số điện thoại"
								placeholder="Nhập số điện thoại..."
								className="halfcolumn column"
							/>
							<CustomInput
								flex="1 0 25%"
								name="Email"
								rule="email"
								label="Email"
								placeholder="Nhập email..."
								className="halfcolumn column"
							/>
						</Row>
						<Row gutter={16}>
							<CustomInput
								flex="1 0 50%"
								name="MainOwnerName"
								rule="required"
								label="Tên người cho thuê"
								placeholder="Nhập tên người cho thuê..."
								className="column"
							/>
							<CustomInput
								flex="1 0 50%"
								name="MainOwnerPhone"
								rule="required"
								label="Số điện thoại người cho thuê"
								placeholder="Nhập số điện thoại người cho thuê..."
								className="halfcolumn column"
							/>
						</Row>
						<div className="title-area">
							<label>
								<HomeOutlined /> THÔNG TIN MẶT BẰNG:
							</label>
						</div>
						<Row gutter={16}>
							<CustomInput
								span={24}
								name="Address"
								rule="required"
								label="Địa chỉ"
								placeholder="Nhập địa chỉ..."
							/>
						</Row>
						<Row gutter={16}>
							<CustomInput
								flex="1 0 25%"
								name="ProvinceID"
								rule="required"
								label="Thành phố"
								type="select"
								options={provinces.map((prov: any) => ({
									ID: prov.ProvinceID,
									Name: prov.ProvinceName,
								}))}
								onChange={handleChangeProvince}
								className="halfcolumn"
							/>
							<CustomInput
								flex="1 0 25%"
								name="DistrictID"
								rule="required"
								label="Quận, huyện"
								type="select"
								disabled={!!!provinceId}
								options={districts.map((dis: any) => ({
									ID: dis.DistrictID,
									Name: dis.DistrictName,
								}))}
								onChange={handleChangeDistrict}
								className="halfcolumn"
							/>{" "}
							<CustomInput
								flex="1 0 25%"
								name="WardID"
								label="Phường, xã"
								disabled={!!!districtId}
								type="select"
								options={wards.map((ward: any) => ({
									ID: ward.WardID,
									Name: ward.WardName,
								}))}
								className="halfcolumn column"
							/>
							<CustomInput
								flex="1 0 25%"
								name="RoadAxisID"
								rule="required"
								disabled={!!!districtId}
								label="Trục đường"
								type="select"
								options={roadAxises.map((road: any) => ({
									ID: road.RoadAxisID,
									Name: road.RoadAxisName,
								}))}
								className="halfcolumn column"
							/>
						</Row>

						<Row gutter={16}>
							<CustomInput
								flex="1 0 25%"
								name="Lng"
								rule="required"
								label="Kinh độ"
								placeholder="Nhập kinh độ..."
								className="halfcolumn"
							/>
							<CustomInput
								flex="1 0 25%"
								name="Lat"
								rule="required"
								label="Vĩ độ"
								placeholder="Nhập vĩ độ..."
								className="halfcolumn"
							/>
							<CustomInput
								flex="1 0 50%"
								name="MapLink"
								rule="required"
								label="Link bản đồ"
								placeholder="Nhập link bản đồ..."
								className="column"
							/>
						</Row>
						<Row gutter={16}>
							<CustomInput
								flex="1 0 25%"
								name="Length"
								rule="required"
								label="Chiều dài"
								placeholder="Nhập chiều dài..."
								className="halfcolumn"
								addonAfter="m"
							/>
							<CustomInput
								flex="1 0 25%"
								name="Width"
								rule="required"
								label="Chiều rộng"
								placeholder="Nhập chiều rộng..."
								className="halfcolumn"
								addonAfter="m"
							/>
							<CustomInput
								flex="1 0 50%"
								name="Acreage"
								rule="required"
								label="Diện tích"
								placeholder="Nhập diện tích..."
								className="halfcolumn column"
								addonAfter="m2"
							/>
						</Row>
						<Row gutter={16}>
							<CustomInput
								flex="1 0 25%"
								name="Frontline"
								rule="required"
								label="DT vỉa hè"
								placeholder="Nhập diện tích vỉa hè..."
								className="halfcolumn column"
								addonAfter="m2"
							/>
							<CustomInput
								flex="1 0 25%"
								name="Pavement"
								rule="required"
								label="DT lề đường"
								placeholder="Nhập diện tích lề đường..."
								className="halfcolumn column"
								addonAfter="m2"
							/>
							<CustomInput
								flex="1 0 25%"
								name="StatusQuo"
								label="Trạng thái"
								type="select"
								options={[
									{ ID: 1, Name: "Đang ở" },
									{ ID: 2, Name: "Kinh doanh" },
									{ ID: 3, Name: "Cho thuê" },
								]}
								className="halfcolumn column"
							/>
							<CustomInput
								flex="1 0 25%"
								name="AtHere"
								label="Đang ở"
								type="check-box"
								checked={checkedAtHere}
								onChange={handleChangeAtHere}
								className="halfcolumn column"
							/>
						</Row>
						<Row gutter={16}>
							<CustomInput
								flex="1 0 50%"
								name="Note"
								label="Ghi chú"
								placeholder="Nhập ghi chú..."
								type="text-area"
								className="halfcolumn column"
								rows={4}
							/>
							<Col flex="1 0 50%">
								<Form.Item label="Hình ảnh mặt bằng">
									<Upload
										listType="picture-card"
										accept=".png,.jpg"
										multiple={true}
										customRequest={(options: any) => {
											options.onSuccess("ok")
										}}
										fileList={fileList}
										maxCount={8}
										onPreview={handlePreview}
										onChange={handleChangeImageFiles}
									>
										{fileList.length >= 8 ? null : (
											<div>
												<PlusOutlined />
												<div style={{ marginTop: 8 }}>Upload</div>
											</div>
										)}
									</Upload>
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col flex="1 0 50%"></Col>
							<Col className="column" flex="1 0 50%">
								<ButtonUI
									style={{ width: "100%" }}
										htmlType="submit"
									text="Lưu thông tin"
								/>
							</Col>
						</Row>
						<Modal
							visible={previewVisible}
							title={previewTitle}
							footer={null}
							onCancel={handleCancel}
						>
							<img style={{ width: "100%" }} src={previewImage} alt="" />
						</Modal>
					</Form>
				</div>
			</Card>
		</div>
	)
}
