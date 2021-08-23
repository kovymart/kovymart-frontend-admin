import React from "react";
interface IProps {
	status?: number;
}

const StatusPlace: React.FC<IProps> = ({ status }) => {
	let text = "loading",
		color = "#000000d9",
		border = "secondary";
	const styles = {
		background: "#fafafa",
		fontSize: "14px",
		maxWidth: "8em",
		borderRadius: "0.2rem",
	};
	switch (status) {
		case 0:
			color = "#08979c";
			styles.background = "#e6fffb";
			border = "info";
			text = "Mới tạo";
			break;
		case 1:
			color = "#d46b08";
			styles.background = "#fff7e6";
			border = "warning";
			text = "Đã gán cho nhân viên mặt bằng";
			break;
		case 2:
			color = "#389e0d";
			styles.background = "#f6ffed";
			border = "success";
			text = "Đã gán cho điểm mặt bằng";
			break;
		default:
			text = "loading";
			break;
	}
	return (
		<div style={styles} className={`border-small bd-${border} align-center`}>
			<span
				style={{
					wordBreak: "keep-all",
					color: `${color}`,
				}}
			>
				{text}
			</span>
		</div>
	);
};

export default StatusPlace;
