import "antd/dist/antd.css";
import React, { useState } from "react";
import "./detail.style.css";
import { Row, Button, Card, Image } from "antd";
import { AppState } from "../../stores";
import { useDispatch, useSelector } from "react-redux";
import { Homeowner } from "./HomeownerInfo.Component";
import { GroundLocation } from "./GroundLocation.Component";
import { GroundInfo } from "./GroundInfo.Component";
import { ModalImages } from "./ModalImages.Component";
import { houseforrent_getbyid } from "../../stores/houseforrent.slice";
import { useParams } from "react-router";

export const Detail = () => {
	//Lấy đường dẫn image
	// const urlImage = "https://insite.thegioididong.com/cdninsite";
	//Initial Data
	const dispatch = useDispatch();
	const { id }: any = useParams();

	React.useEffect(() => {
		let houseforrentid = id;
		dispatch(houseforrent_getbyid(houseforrentid));
	}, [dispatch]);
	const detail: any = useSelector((state: AppState) => state.house.object);

	//Load image lên popup đã tạo
	const showImages = () => {
		let stringImage = detail.Images;
		let images = "Chưa có hình ảnh mặt bằng";
		if (stringImage) {
			images = stringImage.split(";").map((index: any) => {
				return (
					<Image
						key={index}
						src={index}
						alt="ảnh mặt bằng"
						className={"image-detail"}
					/>
				);
			});
		}
		return images;
	};
	//Show Status: Trạng thái mặt bằng
	const showStatus = (value: any) => {
		try {
			switch (value) {
				case (value = 0): {
					return "Mới tạo";
				}
				case (value = 1): {
					return "Đã gán cho nhân viên mặt bằng";
				}
				case (value = 2): {
					return "Đã gắng với điểm mặt bằng";
				}
			}
		} catch (error) {}
	};
	//Show Status: Trạng thái xử lý
	const showStatusQuo = (value: any) => {
		try {
			switch (value) {
				case (value = 0): {
					return "Đang ở";
				}
				case (value = 1): {
					return "Đang kinh doanh";
				}
				case (value = 2): {
					return "Đang cho thuê";
				}
				case (value = 3): {
					return "Đất trống";
				}
			}
		} catch (error) {}
	};
	const [visible, setVisible] = useState(false);
	return (
		<div>
			<Card
				headStyle={{ backgroundColor: "#FFD503", fontSize: "18px" }}
				style={{ width: "100%" }}
				title="THÔNG TIN CHI TIẾT MẶT BẰNG"
				className="col-12"
			>
				<Homeowner
					LandOwnerName={detail.LandOwnerName}
					Phone={detail.Phone}
					Email={detail.Email}
					MainOwnerName={detail.MainOwnerName}
					MainOwnerPhone={detail.MainOwnerPhone}
				/>
				<GroundLocation
					Address={detail.Address}
					ProvinceName={detail.ProvinceName}
					DistrictName={detail.DistrictName}
					RoadAxisName={detail.RoadAxisName}
					WardName={detail.WardName}
					Lng={detail.Lng}
					Lat={detail.Lat}
					MapLink={detail.MapLink}
				/>
				<GroundInfo
					Length={detail.Length}
					Width={detail.Width}
					Acreage={detail.Acreage}
					Pavement={detail.Pavement}
					Frontline={detail.Frontline}
					Status={showStatus(detail.Status)}
					StatusQuo={showStatusQuo(detail.StatusQuo)}
					Note={detail.Note}
				/>

				<Row>
					<Button className="btn-ViewImage" onClick={() => setVisible(true)}>
						Xem chi tiết ảnh
					</Button>
				</Row>
			</Card>
			<ModalImages
				visible={visible}
				onCancel={() => setVisible(false)}
				onOk={() => setVisible(false)}
				showImages={showImages()}
			/>
		</div>
	);
};
